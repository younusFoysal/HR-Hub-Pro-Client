import React from 'react';
import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";

const Messages = () => {

    const axiosSecure = useAxiosSecure();

    //   Fetch works Data
    const {
        data: messages = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/contact`)

            return data
        },
    })

    if (isLoading) return <LoadingSpinner />
    let num = 1;

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

                            {
                                messages.map(msg => <tr key={msg._id}>
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
                                    <span
                                        className="btn btn-sm rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">View Message</span>
                                    </td>
                                </tr>)
                            }


                            </tbody>
                        </table>
                    </div>
                    <div
                        className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                        <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 of 12 Entries </span>
                        <div className="mt-2 inline-flex sm:mt-0">
                            <button
                                className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev
                            </button>
                            <button
                                className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Messages;