import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


function Login() {
    const navigate = useNavigate();
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");



    const Login = () => {
        fetch("/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailLogin,
                password: passwordLogin,
                lastLogin: new Date(),
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast(data.error)
                } else {
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    toast(data.msg)
                    navigate('/');
                }
            }).catch(error => console.log(error))
    }


    return (
        <div className='flex flex-col justify-center h-full'>
            <div className="sm:max-w-[400px] max-w-[290px] w-full mx-auto p-8 px-8 rounded-lg shadow-lg dark:ring-1 dark:ring-inset dark:ring-white/10 bg-white">
                <h2 className="text-4xl font-bold text-center text-[#2bac9e]">Login</h2>
                <div className="flex flex-col text-gray-400 py-2">
                    <label>Email</label>
                    <input
                        type="email"
                        className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-green-500 focus:bg-[#2bac9e1a] focus:outline-none"
                        value={emailLogin}
                        onChange={(e) => setEmailLogin(e.target.value)}
                    />
                </div>
                <div className="flex flex-col text-gray-400 py-2">
                    <label>Password</label>
                    <input
                        type="password"
                        className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-green-500 focus:bg-[#2bac9e1a] focus:outline-none"
                        value={passwordLogin}
                        onChange={(e) => setPasswordLogin(e.target.value)}
                    />
                </div>
                <button className="w-full my-5 py-2 bg-[#2bac9e] shadow-lg text-white font-semibold rounded-lg" onClick={() => Login()}>LOGIN</button>
                <Link className="text-gray-500 underline underline-offset-4 float-right" to="/signup">Sign up?</Link>
            </div>
        </div>
    )
}

export default Login