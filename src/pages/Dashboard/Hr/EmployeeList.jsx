import React, {useState} from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useAuth from "../../../hooks/useAuth.js";
import {Helmet} from "react-helmet-async";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import toast from 'react-hot-toast'
import PayModal from "../../../components/Modal/PayModal.jsx";

const EmployeeList = () => {

    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const { user: loggedInUser } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };


    //   Fetch Employees
    const {
        data: employees = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['my-works'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users-employee`)

            return data
        },
    })

    const { mutateAsync } = useMutation({
        mutationFn: async verify => {
            const { data } = await axiosSecure.patch(
                `/users/update/${verify.email}`,
                verify
            );
            console.log(verify)
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

    // verification toggle
    const handleVerificationToggle = async (email, isVerified) => {
        if (loggedInUser.email === email) {
            return toast.error('Action Not Allowed');
        }

        const userVerify = {
            email,
            isVerfied: !isVerified,
        };
        console.log(userVerify)

        try {
            await mutateAsync(userVerify);
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    if (isLoading) return <LoadingSpinner />


    // TODO: Payment Modal




    return (
        <> <Helmet>
            <title> Employee List | Dashboard</title>
        </Helmet>

            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bank Account Num
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Verified
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Salary
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                    employees.map(employee => <tr key={employee._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src={employee.photo}
                                         alt=""/>
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {employee.name}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{employee.bankaccount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                className={`btn btn-sm inline-flex text-xs hover:-translate-y-1 hover:shadow-gray-400 hover:shadow-xl leading-5 font-semibold
                                 rounded bg-${employee.isVerfied ? 'green' : 'red'}-100 text-${employee.isVerfied ? 'green' : 'red'}-800`}
                                onClick={() => handleVerificationToggle(employee.email, employee.isVerfied)}
                            >
                                {employee.isVerfied===true ? "✅" : "❌"}
                            </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {employee.salary ? "$ " + employee.salary : "Update your Profile"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {employee.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                            <button
                                onClick={openModal}
                                className="btn btn-sm px-2 inline-flex text-xs hover:-translate-y-0.5 hover:shadow-gray-400 hover:shadow-xl leading-5 font-semibold rounded bg-green-100 text-green-800">
                                Pay
                            </button>
                            {/*<PayModal*/}
                            {/*    isOpen={isOpen}*/}
                            {/*    refetch={refetch}*/}
                            {/*    closeModal={closeModal}*/}
                            {/*    payInfo={{*/}
                            {/*        ...employee,*/}
                            {/*        salary: employee.salary,*/}
                            {/*        employee: {*/}
                            {/*            name: employee.name,*/}
                            {/*            email: employee.email*/}
                            {/*        }*/}
                            {/*    }}*/}

                            {/*/>*/}


                            {isOpen && (
                                <div className="fixed z-10 inset-0 overflow-y-auto">
                                    <div className="flex items-center justify-center min-h-screen">
                                        <div className="bg-white w-1/2 p-6 rounded shadow-md">
                                            <div className="flex justify-end">
                                                {/* Close Button */}
                                                <button
                                                    onClick={closeModal}
                                                    className="text-gray-700 hover:text-red-500"
                                                >
                                                    <svg
                                                        className="w-6 h-6"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

                                            <form>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="name"
                                                        className="block text-gray-700 text-sm font-bold mb-2"
                                                    >
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-gray-700 text-sm font-bold mb-2"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="message"
                                                        className="block text-gray-700 text-sm font-bold mb-2"
                                                    >
                                                        Message
                                                    </label>
                                                    <textarea
                                                        id="message"
                                                        name="message"
                                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                                                    ></textarea>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                                                >
                                                    Send Message
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}



                            <Link to={`/dashboard/details/${employee.email}`}>
                            <div className="btn btn-sm ml-2 text-red-600 hover:-translate-y-0.5 hover:shadow-gray-400 hover:shadow-xl hover:text-red-900 px-2 inline-flex text-xs leading-5 font-semibold rounded bg-red-100">
                                Details
                            </div>
                            </Link>

                        </td>
                    </tr>)
                }







                </tbody>
            </table>


        </>
    );
};

export default EmployeeList;