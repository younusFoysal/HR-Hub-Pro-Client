import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { imageUpload } from '../../../api/utils'
import { Helmet } from 'react-helmet-async'
import {useMutation, useQuery} from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";

const WorkSheet = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()


    //   Post work Data
    const { mutateAsync } = useMutation({
        mutationFn: async workData => {
            const { data } = await axiosSecure.post(`/work`, workData)
            return data
        },
        onSuccess: () => {
            console.log('Data Saved Successfully')
            toast.success('Work Added Successfully!')
            // add refetch table code
            refetch()
            setLoading(false)
        },
    })

    //   Form handler
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        const form = e.target

        const task = form.task.value
        const whrs = Number(form.whrs.value)
        const date = form.date.value

        const employee = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        }

        try {
            const workData = {
                task,
                whrs,
                date,
                employee,
            }
            console.table(workData)

            //   Post request to server
            await mutateAsync(workData)
        } catch (err) {
            console.log(err)
            toast.error(err.message)
            setLoading(false)
        }
    }

    //   Fetch works Data
    const {
        data: works = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['my-works', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-works/${user?.email}`)

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


    return (
        <>
            <Helmet>
                <title>Work Sheet | Dashboard</title>
            </Helmet>

            {/* Form */}
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form onSubmit={handleSubmit}>
                        <div className="flex space-x-4 items-center">
                            <div className="flex flex-col justify-center w-1/4">
                                <label htmlFor="task"
                                       className="block text-base font-medium text-[#07074D] text-center">
                                    Tasks
                                </label>
                            </div>
                            <div className="flex flex-col justify-center w-1/4">
                                <label htmlFor="whrs"
                                       className="block text-base font-medium text-[#07074D] text-center">
                                    Hours Worked
                                </label>
                            </div>
                            <div className="flex flex-col justify-center w-1/4">
                                <label htmlFor="date"
                                       className="block text-base font-medium text-[#07074D] text-center">
                                    Date
                                </label>
                            </div>
                            <div className="flex flex-col justify-center w-1/4">
                                <label className="block text-base font-medium text-transparent">Add</label>
                            </div>
                        </div>
                        <div className="flex space-x-4 items-center mt-2">
                            <div className="w-1/4">
                                <select id="task" name="task" required
                                        className="w-full h-12 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-3 py-2 tracking-wider">
                                    <option defaultValue="sales" value="sales">Sales</option>
                                    <option value="support">Support</option>
                                    <option value="content">Content</option>
                                    <option value="paper-work">Paper-work</option>
                                </select>
                            </div>
                            <div className="w-1/4">
                                <input type="number" name="whrs" id="whrs" placeholder="7" required
                                       className="w-full h-12 rounded border-2 border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] px-3 py-2"/>
                            </div>
                            <div className="w-1/4">
                                <input type="date" name="date" id="date" required
                                       className="w-full h-12 rounded border-2 border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] px-3 py-2"/>
                            </div>
                            <div className="w-1/4">
                                <button
                                    type="submit"
                                    className="hover:shadow-form rounded bg-[#6A64F1] text-base font-semibold text-white outline-none h-12 px-6">
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            {/* Table */}
            <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table className="w-full table-fixed">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Tasks</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Hours Worked</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Date</th>

                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {
                        works
                            ?.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
                            .map(work => (
                                <tr key={work._id}>
                                    <td className="py-4 px-6 border-b border-gray-200">{work.task}</td>
                                    <td className="py-4 px-6 border-b border-gray-200 truncate">{work.whrs} hr</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{formatDate(work.date)}</td>
                                    {/*  2024-06-03  */}
                                </tr>
                            ))
                    }
                    </tbody>

                </table>
            </div>

        </>
    )
}

export default WorkSheet
