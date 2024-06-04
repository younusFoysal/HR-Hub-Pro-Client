import React, {useState} from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useAuth from "../../../hooks/useAuth.js";
import {useQuery} from "@tanstack/react-query";
import {Helmet} from "react-helmet-async";

const AdminEmployeeList = () => {

    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const { user: loggedInUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);


    // Fetch Employees
    const { data: employees = [], isLoading, refetch } = useQuery({
        queryKey: ['verified-employee'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/verified-employee`);
            return data;
        },
    });








    return (
        <>

            <Helmet>
                <title>Employee List | Admin Dashboard</title>
            </Helmet>

            <div className="relative rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-800">
                <div className="flex flex-col gap-4 justify-center items-center w-full h-full px-3 md:px-0">

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        Admin Portal
                    </h1>
                    <p className="text-gray-300">
                        Manage All Employees
                    </p>

                    <div className="shadow-lg rounded-lg overflow-hidden m-3 md:mx-4">
                        <table className="w-full table-fixed">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Designation</th>
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Update Role</th>
                                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Action</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">

                            {
                                employees.map(employee => <tr key={employee._id}>
                                    <td className="py-4 px-6 border-b border-gray-200">{employee.name}</td>
                                    <td className="py-4 px-6 border-b border-gray-200 truncate">{employee.designation}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <button
                                            className={`btn btn-sm inline-flex text-xs hover:-translate-y-1 hover:shadow-gray-400 hover:shadow-xl leading-5 font-semibold
                                    rounded bg-${employee.isVerfied ? 'green' : 'red'}-100 text-${employee.isVerfied ? 'green' : 'red'}-800`}
                                            onClick={() => handleVerificationToggle(employee.email, employee.isVerfied)}
                                        >
                                            {employee.role==="hr" ? "Make Employee" : "Make HR"}
                                        </button>

                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <button
                                            className="btn btn-sm bg-red-500 text-white py-1 px-2 rounded text-xs">Fire
                                        </button>
                                    </td>
                                </tr>)

                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AdminEmployeeList;