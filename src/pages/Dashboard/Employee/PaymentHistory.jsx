import React, {useEffect, useState} from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useAuth from "../../../hooks/useAuth.js";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";
import {useQuery} from "@tanstack/react-query";


const PaymentHistory = () => {

    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    //   Fetch works Data
    const {
        data: payHist = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['my-salary', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-salary/${user?.email}`)

            return data
        },
    })

    if (isLoading) return <LoadingSpinner />

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }




    let num = 1;

    return (
            <div  className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg divide-y divide-gray-200 ">

                        <div className="overflow-hidden">
                            <table id="example" className="min-w-full divide-y divide-gray-200 ">
                                <thead className="bg-gray-50 ">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Month
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Amount
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Date
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                        Transaction
                                        Id
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {
                                    payHist
                                        ?.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
                                        .map(pay => (
                                            <tr key={pay._id}>
                                                <td className="py-4 px-6 border-b border-gray-200">{pay.month}</td>
                                                <td className="py-4 px-6 border-b border-gray-200 truncate">$ {pay.salary}</td>
                                                <td className="py-4 px-6 border-b border-gray-200">{formatDate(pay.date)}</td>
                                                <td className="py-4 px-6 border-b border-gray-200">{pay.transactionId}</td>
                                                {/*  2024-06-03  */}
                                            </tr>
                                        ))
                                }

                                </tbody>
                            </table>
                        </div>


                        <div className="py-1 px-4">
                            <nav className="flex items-center space-x-1">
                                <button type="button" className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ">
                                    <span aria-hidden="true">«</span>
                                    <span className="sr-only">Previous</span>
                                </button>
                                <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none " aria-current="page">1</button>
                                <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none ">2</button>
                                <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none ">3</button>
                                <button type="button" className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ">
                                    <span className="sr-only">Next</span>
                                    <span aria-hidden="true">»</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default PaymentHistory;