import React, {useState} from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useAuth from "../../../hooks/useAuth.js";
import {Helmet} from "react-helmet-async";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import toast from 'react-hot-toast'

const EmployeeList = () => {

    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { user: loggedInUser } = useAuth()

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
                            <a href="#" className="btn btn-sm px-2 inline-flex text-xs hover:-translate-y-0.5 hover:shadow-gray-400 hover:shadow-xl leading-5 font-semibold rounded bg-green-100 text-green-800">
                                Pay
                            </a>

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