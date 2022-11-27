import { useState, useContext } from "react";
import moment from "moment/moment";
import { UserContext } from "../App";


function Table({ columns, data }) {
    const { state, dispatch } = useContext(UserContext);
    const [isCheckAll, setIsCheckAll] = useState(false);

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        dispatch({type: "USERS", payload: data.map(li => li._id)})
        if (isCheckAll) {
            dispatch({type: "USERS", payload: []})
        }
    };

    const handleClick = e => {
        const { name, checked } = e.target;
        dispatch({type: "USERS", payload: [...state, name]});
        if (!checked) {
            dispatch({type: "USERS", payload: state.filter(item => item !== name)})
        }
    };


    return (
        <div className="mt-6 flex flex-col">
            <div className="overflow-x-auto">
                <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="group px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        <input type="checkbox" className="w-4 h-4 align-middle" name="selectAll" onChange={handleSelectAll} checked={isCheckAll} />
                                    </th>
                                    {
                                        columns.map((headers, i) => (
                                            <th
                                                scope="col"
                                                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                key={i}
                                            >
                                                {headers}
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    data?.map((user, i) => (
                                        <tr key={i}>
                                            <td className="px-4 py-4 whitespace-nowrap"><input type="checkbox" className="w-4 h-4 align-middle" name={user._id} checked={state.includes(user._id)} onChange={handleClick} /></td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{moment(user.regTime).format("MMM Do YY")}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{moment(user.lastLogin).fromNow()}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap ${user.status ? "text-green-500" : "text-red-500"}`}>{user.status ? "Active" : "Blocked"}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table