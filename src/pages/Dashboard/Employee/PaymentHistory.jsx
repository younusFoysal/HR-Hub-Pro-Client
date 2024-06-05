import React, {useEffect, useState} from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useAuth from "../../../hooks/useAuth.js";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";
import {useQuery} from "@tanstack/react-query";


const PaymentHistory = () => {

    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

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

    const sortByMonthYearDesc = (a, b) => {
        if (a.year === b.year) {
            return b.month - a.month;
        } else {
            return b.year - a.year;
        }
    };

    const sortedPayHist = [...payHist].sort(sortByMonthYearDesc);
    console.log(sortedPayHist)

    const totalPages = Math.ceil(sortedPayHist.length / rowsPerPage);

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const currentRows = sortedPayHist.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);




    let num = 1;

    return (
        <div className="m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border rounded-lg divide-y divide-gray-200">
                    <div className="overflow-hidden">
                        <table id="example" className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
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
                                    Transaction Id
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {currentRows.map((pay) => (
                                <tr key={pay._id}>
                                    <td className="py-4 px-6 border-b border-gray-200">{pay.month}/{pay.year}</td>
                                    <td className="py-4 px-6 border-b border-gray-200 truncate">$ {pay.salary}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{pay.transactionId}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {sortedPayHist.length > rowsPerPage && (
                        <div className="py-1 px-4">
                            <nav className="flex items-center space-x-1">
                                <button
                                    type="button"
                                    className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                    onClick={() => handleChangePage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <span aria-hidden="true">«</span>
                                    <span className="sr-only">Previous</span>
                                </button>
                                {Array.from({length: totalPages}, (_, i) => (
                                    <button
                                        key={i + 1}
                                        type="button"
                                        className={`min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full ${currentPage === i + 1 ? 'bg-gray-200' : ''}`}
                                        onClick={() => handleChangePage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                    onClick={() => handleChangePage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <span className="sr-only">Next</span>
                                    <span aria-hidden="true">»</span>
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;