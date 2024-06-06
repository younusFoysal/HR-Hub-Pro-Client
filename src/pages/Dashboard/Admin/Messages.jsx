import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";
import { ImCross } from "react-icons/im";

const Messages = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const openModal = (msg) => {
        console.log(msg)
        setSelectedMsg(msg);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedMsg(null);
    };

    const axiosSecure = useAxiosSecure();

    const {
        data: messages = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/contact`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    const totalPages = Math.ceil(messages.length / rowsPerPage);
    const startRow = (currentPage - 1) * rowsPerPage;
    const currentMessages = messages.slice(startRow, startRow + rowsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    let num = startRow + 1;

    return (
        <div>
            <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                <div className="flex items-center justify-between pb-6">
                    <div>
                        <h2 className="font-semibold text-gray-700">Guest Messages</h2>
                        <span className="text-xs text-gray-500">View messages from contact</span>
                    </div>
                </div>
                <div className="overflow-y-hidden rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-green-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                <th className="px-5 py-3">No</th>
                                <th className="px-5 py-3">Name</th>
                                <th className="px-5 py-3">Email</th>
                                <th className="px-5 py-3">Date</th>
                                <th className="px-5 py-3">Sent at</th>
                                <th className="px-5 py-3">Action</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-500">
                            {currentMessages.map(msg => (
                                <tr key={msg._id}>
                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">{num++}</p>
                                    </td>
                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <p className="whitespace-no-wrap">{msg.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">{msg.email}</p>
                                    </td>
                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">{msg.date}</p>
                                    </td>
                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <p className="whitespace-no-wrap">{msg.time}</p>
                                    </td>
                                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                        <button
                                            onClick={() => openModal(msg)}
                                            className="btn btn-sm rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                                            View Message
                                        </button>
                                        {isOpen && selectedMsg && (
                                            <div className="fixed z-10 inset-0 overflow-y-auto">
                                                <div className="flex items-center justify-center min-h-screen">
                                                    <div className="bg-white w-1/3 p-6 rounded shadow-md">
                                                        <div className="flex justify-end">
                                                            <button
                                                                onClick={closeModal}
                                                                className="text-gray-700 hover:text-green-500"
                                                            >
                                                                <ImCross />
                                                            </button>
                                                        </div>
                                                        <h2 className="text-2xl text-center text-green-500 font-bold mb-4">Guest Message</h2>
                                                        <h2 className="text-xl font-medium mb-4"><span className="font-bold">Name:</span> {selectedMsg.name}</h2>
                                                        <h2 className="text-xl font-medium mb-4"><span className="font-bold">Message:</span> {selectedMsg.message} </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                        <span className="text-xs text-gray-600 sm:text-sm">
                            Showing {startRow + 1} to {Math.min(startRow + rowsPerPage, messages.length)} of {messages.length} Entries
                        </span>
                        <div className="mt-2 inline-flex sm:mt-0">
                            <button
                                onClick={handlePrevPage}
                                className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <button
                                onClick={handleNextPage}
                                className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
