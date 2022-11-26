const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = require("../middleware/login");


router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists" });
            }
            bcrypt.hash(password, 10)
                .then(hashedPass => {
                    const user = new User({
                        name,
                        email,
                        password: hashedPass,
                        lastLogin: Date.now(),
                        regTime: Date.now(),
                    });
                    user.save()
                        .then(user => {
                            res.json({ msg: "Successfully registered, Please login." });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
        })
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "Please add email or password" });
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "User does not exist" });
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                        const { _id, name, email, status } = savedUser;
                        if (status === false) {
                            return res.status(422).json({ error: "You are blocked" });
                        }
                        User.findByIdAndUpdate(_id, { lastLogin: Date.now() }, (err, data) => {
                            if (err) console.log(err);
                            else console.log("Successfully updated the lastLogin", data);
                        });
                        res.json({ token, user: { _id, name, email } });
                    } else {
                        return res.status(422).json({ error: "Wrong password" });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
});

router.get('/users', login, (req, res) => {
    User.find()
        .select("-password")
        .then(users => {
            const { email } = req.headers;
            User.findOne({ email })
                .then(user => {
                    if (!user || user.status === false) {
                        return res.status(422).json({ error: "You are blocked or deleted" });
                    }
                    res.json({ users });
                })
        })
        .catch(err => {
            console.log(err);
        })
});

router.delete('/users/delete', login, (req, res) => {
    let id = {
        _id: {
            $in: req.body.state.map(s => mongoose.Types.ObjectId(s))
        }
    }
    User.deleteMany(id, function (err, data) {
        if (err) res.status(422).json({ error: "Cannot deleted" });
        else res.json({ msg: "Successfully users deleted" });
    })
});

router.put('/users/block', login, (req, res) => {
    let id = {
        _id: {
            $in: req.body.state.map(s => mongoose.Types.ObjectId(s))
        }
    }
    User.updateMany(id, { status: false }, function (err, data) {
        if (err) res.status(422).json({ error: "Cannot deleted" });
        else res.json({ msg: "Successfully users deleted" });
    })
});

router.put('/users/unblock', login, (req, res) => {
    let id = {
        _id: {
            $in: req.body.state.map(s => mongoose.Types.ObjectId(s))
        }
    }
    User.updateMany(id, { status: true }, function (err, data) {
        if (err) res.status(422).json({ error: "Cannot deleted" });
        else res.json({ msg: "Successfully users deleted" });
    })
});

module.exports = router;