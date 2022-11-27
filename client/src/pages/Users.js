import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { UserContext } from "../App";


function Users() {
    const { state, dispatch } = useContext(UserContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        await fetch("/users", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "AA " + localStorage.getItem("jwt"),
                "email": JSON.parse(localStorage.getItem("user"))?.email,
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    toast(data.error)
                    localStorage.clear();
                    setData([]);
                    navigate('/login');
                }
                setData(data.users);
                dispatch({type: "USERS", payload: []})
            })
            .catch(error => {
                localStorage.clear();
                setData([]);
                navigate('/login');
            })
    }

    const columns = ["Id", "Name", "Email", "Created", "Last Login", "Status"]
    return (
        <>
            <Navbar getUsers={getUsers} />
            <div className="custom-container mx-auto">
                {
                    data?.length ? <Table columns={columns} data={data} />
                        :
                        <h1 className="text-4xl text-center mt-4 text-white">Loading...</h1>
                }
            </div>
        </>
    )
}

export default Users