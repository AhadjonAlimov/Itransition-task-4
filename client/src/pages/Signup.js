import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        let data = JSON.stringify({
            name,
            email,
            password,
        });

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast(data.error)
                } else {
                    toast(data.msg)
                    navigate('/login');
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <>
        <div className='flex flex-col justify-center h-full'>
            <div className="sm:max-w-[400px] max-w-[290px] w-full mx-auto p-8 px-8 rounded-lg shadow-lg dark:ring-1 dark:ring-inset dark:ring-white/10 bg-white">
                <h2 className="text-4xl font-bold text-center text-[#2bac9e]">Sign up</h2>
                <div className="flex flex-col text-gray-400 py-2">
                    <label>Name</label>
                    <input
                        type="text"
                        className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-green-500 focus:bg-[#2bac9e1a] focus:outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col text-gray-400 py-2">
                    <label>Email</label>
                    <input
                        type="email"
                        className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-green-500 focus:bg-[#2bac9e1a] focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col text-gray-400 py-2">
                    <label>Password</label>
                    <input
                        type="password"
                        className="rounded-lg bg-gray-100 mt-2 p-2 focus:border-green-500 focus:bg-[#2bac9e1a] focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="w-full my-5 py-2 bg-[#2bac9e] shadow-lg text-white font-semibold rounded-lg" onClick={() => handleSubmit()}>SIGN UP</button>
                <Link className="text-gray-500 underline underline-offset-4 float-right" to="/login">Login?</Link>
            </div>
        </div>
        </>
        
    )
}

export default Signup
