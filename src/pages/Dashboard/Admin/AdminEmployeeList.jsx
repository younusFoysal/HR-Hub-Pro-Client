import React, { useState } from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useAuth from "../../../hooks/useAuth.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";
import Swal from 'sweetalert2';
import TableView from './TableView';
import CardGridView from './CardGridView';

const AdminEmployeeList = () => {
    const axiosSecure = useAxiosSecure();
    const { user: loggedInUser } = useAuth();
    const [isTableView, setIsTableView] = useState(true);

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
            toast.success('Employee data updated successfully');
        },
        onError: error => {
            toast.error(`Failed to update status: ${error.message}`);
        }
    });

    const handleRoleToggle = async (email, role) => {
        if (loggedInUser.email === email) {
            return toast.error('Action Not Allowed');
        }

        role = role === "hr" ? "employee" : "hr";

        const userRole = { email, role };

        try {
            await mutateAsync(userRole);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleFire = async (email, isFired) => {
        if (loggedInUser.email === email) {
            return toast.error('Action Not Allowed');
        }

        const call = async (userFire) => {
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
                    role: ""
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

    const handleAdjustSalary = async (email, salary) => {
        const inputValue = salary;

        const { value } = await Swal.fire({
            title: "Enter Salary",
            input: "number",
            inputLabel: `Employee Salary is: $ ${inputValue}`,
            inputValue,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write a number!";
                } else if (value < inputValue) {
                    return "Only increasing of salary is Allowed!";
                }
            }
        });

        if (value) {
            Swal.fire(`Employee Salary is $ ${value}`);

            const newSalary = Number(value);
            const userSalary = { email, salary: newSalary };

            try {
                await mutateAsync(userSalary);
            } catch (err) {
                toast.error(err.message);
            }
        }
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <Helmet>
                <title>Employee List | Admin Dashboard</title>
            </Helmet>



            <div className="relative rounded-lg animated-background bg-gradient-to-tr from-lime-600 via-lime-700 to-green-800 min-h-screen">
                <div className="flex flex-col gap-4 justify-center items-center w-full h-full px-3 md:px-0">
                    <h1 className=" mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        Admin Portal
                    </h1>
                    <p className="text-gray-300">
                        Manage All Employees
                    </p>
                    <button
                        className="btn btn-success bg-lime-300 mb-2"
                        onClick={() => setIsTableView(!isTableView)}
                    >
                        {isTableView ? "Switch to Card View" : "Switch to Table View"}
                    </button>
                    <div className="shadow-lg rounded-lg overflow-hidden m-3 md:mx-4 w-full">
                        {isTableView ? (
                            <TableView
                                employees={employees}
                                handleRoleToggle={handleRoleToggle}
                                handleAdjustSalary={handleAdjustSalary}
                                handleFire={handleFire}
                                loggedInUser={loggedInUser}
                            />
                        ) : (
                            <CardGridView
                                employees={employees}
                                handleRoleToggle={handleRoleToggle}
                                handleAdjustSalary={handleAdjustSalary}
                                handleFire={handleFire}
                                loggedInUser={loggedInUser}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminEmployeeList;
