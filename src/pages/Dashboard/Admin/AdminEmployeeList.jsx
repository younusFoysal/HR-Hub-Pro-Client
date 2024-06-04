import React, {useState} from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useAuth from "../../../hooks/useAuth.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Helmet} from "react-helmet-async";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";
import Swal from 'sweetalert2'

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


    const { mutateAsync } = useMutation({
        mutationFn: async role => {
            const { data } = await axiosSecure.patch(`/users/update/${role.email}`, role);
            return data;
        },
        onSuccess: data => {
            refetch();
            toast.success('Employee status updated successfully');
        },
        onError: error => {
            toast.error(`Failed to update status: ${error.message}`);
        }
    });

    // Role toggle
    const handleRoleToggle = async (email, role) => {
        if (loggedInUser.email === email) {
            return toast.error('Action Not Allowed');
        }

        if (role==="hr") {
            role = "employee"
        }else if (role==="employee") {
            role = "hr"
        }

        const userRole = {
            email,
            role: role,
        };

        try {
            await mutateAsync(userRole);
        } catch (err) {
            toast.error(err.message);
        }
    };


    // Fire employee
    const handleFire = async (email, isFired) => {

        if (loggedInUser.email === email) {
            return toast.error('Action Not Allowed');
        }



        const call= async (userFire) => {
            await mutateAsync(userFire);
        }


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Fire Employee!"
        }).then((result) => {
            if (result.isConfirmed) {


                const userFire = {
                    email,
                    isFired: !isFired,
                };

                try {
                    call(userFire);
                } catch (err) {
                    toast.error(err.message);
                }


                Swal.fire({
                    title: "Fired!",
                    text: "Employee has been Fired.",
                    icon: "success"
                });
            }
        });


    }

    if (isLoading) return <LoadingSpinner />;







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
                                            onClick={() => handleRoleToggle(employee.email, employee.role)}
                                        >
                                            {employee.role==="hr" ? "Make Employee" : "Make HR"}
                                        </button>

                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <button
                                            onClick={() => handleFire(employee.email, employee.isFired)}
                                            disabled={employee.isFired===true ? "disabled" : ""}
                                            className="btn btn-sm bg-red-500 text-white py-1 px-2 rounded text-xs disabled:text-black disabled:font-bold">
                                            {employee.isFired===true ? "Fired" : "Fire"}
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