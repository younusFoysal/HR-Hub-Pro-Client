import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner.jsx';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const WorkRecords = () => {
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));
    const [works, setWorks] = useState([]);
    const axiosSecure = useAxiosSecure();

    const { data: fetchedWorks = [], isLoading, refetch } = useQuery({
        queryKey: ['works'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/works');
            return data;
        },
    });

    useEffect(() => {
        if (Array.isArray(fetchedWorks)) {
            setWorks(fetchedWorks);
        }
    }, [fetchedWorks]);

    const handleEmployeeChange = (e) => {
        setSelectedEmployee(e.target.value);
    };

    const handleMonthChange = (e) => {
        setCurrentMonth(e.target.value);
    };

    const filteredWorks = works.filter((work) => {
        const workMonth = work.date.slice(0, 7); // Extract the month in 'YYYY-MM' format
        const employeeMatches = selectedEmployee ? work.employee.name === selectedEmployee : true;
        const monthMatches = workMonth === currentMonth;
        return employeeMatches && monthMatches;
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getMonthOptions = () => {
        const months = [
            { value: '01', label: 'January' },
            { value: '02', label: 'February' },
            { value: '03', label: 'March' },
            { value: '04', label: 'April' },
            { value: '05', label: 'May' },
            { value: '06', label: 'June' },
            { value: '07', label: 'July' },
            { value: '08', label: 'August' },
            { value: '09', label: 'September' },
            { value: '10', label: 'October' },
            { value: '11', label: 'November' },
            { value: '12', label: 'December' },
        ];
        const year = new Date().getFullYear();
        return months.map(month => ({
            value: `${year}-${month.value}`,
            label: `${month.label} ${year}`,
        }));
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <div className="flex flex-row items-center gap-4 justify-around">
                <div>
                    <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4 text-lime-500 font-sans font-bold border-lime-400">
                        Work Progress
                    </h1>
                </div>
                <div>
                    <div className="gap-6 flex items-center justify-center">
                        <div className="bg-lime-600 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
                            <div className="flex items-center gap-4">
                                <div className="w-fit transition-all transform duration-500">
                                    <h1 className="text-white text-xl font-bold">
                                        Total Work Hours: {filteredWorks.reduce((total, work) => total + work.whrs, 0)} hr
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-center p-4">
                <div className="flex space-x-4">
                    <label>
                        Select Employee:
                        <select
                            value={selectedEmployee}
                            onChange={handleEmployeeChange}
                            className="w-full h-12 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-3 py-2 tracking-wider">
                            <option value="">All</option>
                            {Array.from(new Set(works.map(work => work.employee.name))).map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Select Month:
                        <select
                            value={currentMonth}
                            onChange={handleMonthChange}
                            className="w-full h-12 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-3 py-2 tracking-wider">
                            {getMonthOptions().map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
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
                    {filteredWorks
                        ?.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
                        .map(work => (
                            <tr key={work._id}>
                                <td className="py-4 px-6 border-b border-gray-200">{work.task}</td>
                                <td className="py-4 px-6 border-b border-gray-200 truncate">{work.whrs} hr</td>
                                <td className="py-4 px-6 border-b border-gray-200">{formatDate(work.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkRecords;
