import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from 'react-toastify';


function Navbar({ getUsers }) {
    const { state, dispatch } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleSubmit = e => {
        const { name, title } = e.currentTarget;
        fetch(`/users/${name}`, {
            method: title,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "AA " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                state,
            })
        }).then(result => {
            if (result.error) {
                toast(result.error);
            }
            getUsers();
        })
    }

    if (location.pathname !== "/signup" && location.pathname !== "/login") {
        return (
            <div className="bg-white overflow-hidden h-16 px-2 lg:px-5">
                <div className="custom-container mx-auto flex items-center h-full justify-between">
                    <h1 className="text-xl font-bold text-[#2bac9e]">TASK 4</h1>
                    <div className="flex gap-1">
                        <button className="grid place-content-center bg-gray-200 w-11 h-11 rounded-full" name="block" title="PUT" onClick={handleSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </button>
                        <button className="grid place-content-center bg-gray-200 w-11 h-11 rounded-full" name="unblock" title="PUT" onClick={handleSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </button>
                        <button className="grid place-content-center bg-gray-200 w-11 h-11 rounded-full" name="delete" title="DELETE" onClick={handleSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                    <button
                        className="bg-[#00aeef] hover:bg-[#009bef] text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => {
                            localStorage.clear();
                            navigate("/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    }

}

export default Navbar