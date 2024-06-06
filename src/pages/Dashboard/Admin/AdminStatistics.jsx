import React from 'react';
import {FaUsers, FaUserShield} from "react-icons/fa";
import {MdWorkHistory} from "react-icons/md";
import {Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis} from "recharts";
import ReactWeather, {useVisualCrossing} from "react-open-weather";
import {Calendar} from "react-date-range";
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";
import {FaUsersGear} from "react-icons/fa6";
import {IoIosMailUnread} from "react-icons/io";

const AdminStatistics = () => {

    const { user } = useAuth()
    console.log(user)
    const axiosSecure = useAxiosSecure()


    const { data, errorMessage } = useVisualCrossing({
        key: import.meta.env.VITE_WEATHER_API_KEY,
        lat: '22.3357194',
        lon: '91.8001583',
        lang: 'en',
        unit: 'metric', // values are (metric,us,uk)
    });

    //   Fetch works Data
    const {
        data: astat = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['adminStat'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/adminStat`)

            return data
        },
    })

    if (isLoading) return <LoadingSpinner />


    console.log(astat)

    const stats = [
        {
            Name: 'Works',
            TotalEmployees: astat.totalEmployees,
            TotalHR: astat.totalhr
        }
    ]


    return (
        <div>
            <div
                className="h-full w-full animated-background bg-gradient-to-tr from-lime-600 via-emerald-600 to-teal-800">

                {/*<div className="flex flex-wrap gap-4 justify-center pt-32">*/}
                {/*    <div*/}
                {/*        className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 max-w-[240px] bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">*/}
                {/*        <div className="font-semibold text-lg">Today</div>*/}
                {/*        <div className="font-semibold text-5xl tracking-tight">$12.921</div>*/}
                {/*        <div className="font-normal">Gross volume</div>*/}
                {/*    </div>*/}


                {/*    <div*/}
                {/*        className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 max-w-[240px] bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">*/}
                {/*        <div className="font-semibold text-lg">Yesterday</div>*/}
                {/*        <div className="font-semibold text-5xl tracking-tight">$9.524</div>*/}
                {/*        <div className="font-normal">Gross volume</div>*/}
                {/*    </div>*/}
                {/*</div>*/}


                <section className="relative overflow-hidden">
                    <img className="absolute top-0 h-full w-full object-cover object-center opacity-30"
                         src=""/>

                    <div
                        className="bg-white/30 relative mx-auto flex h-full w-full flex-col items-center justify-center px-4 py-6 backdrop-blur-md sm:px-6 sm:py-6 lg:px-8 lg:py-10">
                        <h2 className="-mx-4 px-4 pt-4 pb-2 text-3xl text-white sm:text-4xl xl:text-5xl text-center">Welcome {user.displayName} to <br/> <span
                            className="font-bold">HR Hub Admin Panel</span></h2>
                        <p className="text-white">Enjoy Your Every Day Work Life.</p>

                        <div
                            className="mx-auto grid max-w-screen-lg grid-cols-1 gap-y-4 gap-x-8 text-center sm:mt-12 sm:text-left md:grid-cols-3">

                            {/*Start*/}
                            <div
                                className="w-full rounded-[25px] bg-white/10 mb-3 p-8 shadow-xl backdrop-blur-lg transition duration-200 hover:scale-105 hover:shadow-xl hover:bg-white/15">
                                <div className="h-12">
                                    <FaUsers className="text-5xl text-white"></FaUsers>
                                </div>
                                <div className="my-2">
                                    <h2 className="text-4xl font-bold text-white"><span>{astat.totalEmployees}</span>+
                                    </h2>
                                </div>

                                <div>
                                    <p className="mt-2 font-sans text-base font-semibold text-white">
                                        Total Employees
                                    </p>
                                </div>
                            </div>
                            {/*End*/}

                            {/*Start*/}
                            <div
                                className="w-full rounded-[25px] bg-white/10 mb-3 p-8 shadow-xl backdrop-blur-lg transition duration-200 hover:scale-105 hover:shadow-xl hover:bg-white/15 ">
                                <div className="h-12">
                                    <FaUsersGear  className="text-5xl text-white"></FaUsersGear >
                                </div>
                                <div className="my-2">
                                    <h2 className="text-4xl font-bold text-white">
                                        <span>{astat.totalhr}</span>+</h2>
                                </div>

                                <div>
                                    <p className="mt-2 font-sans text-base font-semibold text-white">
                                        Total HRs
                                    </p>
                                </div>
                            </div>
                            {/*End*/}

                            {/*Start*/}
                            <div
                                className="w-full rounded-[25px] bg-white/10 mb-3 p-8 shadow-xl backdrop-blur-lg transition duration-200 hover:scale-105 hover:shadow-xl hover:bg-white/15 ">
                                <div className="h-12">
                                    <IoIosMailUnread  className="text-5xl text-white"></IoIosMailUnread >
                                </div>
                                <div className="my-2">
                                    <h2 className="text-4xl font-bold text-white"><span>{astat.totalmsg}</span>+</h2>
                                </div>

                                <div>
                                    <p className="mt-2 font-sans text-base font-semibold text-white">
                                        Total Guest Messages
                                    </p>
                                </div>
                            </div>
                            {/*End*/}


                        </div>

                        <div className="bg-white rounded-xl mt-8">
                            {/*    Chart Start*/}

                            <BarChart
                                width={500}
                                height={300}
                                data={stats}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="Works"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="TotalEmployees" fill="blue"
                                     activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                                <Bar dataKey="TotalHR" fill="orange"
                                     activeBar={<Rectangle fill="gold" stroke="purple"/>}/>
                            </BarChart>

                            {/*    Chart End */}
                        </div>

                        <div className="flex flex-col gap-6 mt-10 md:flex-row md:gap-4 md:mt-4">


                            {/*    Weather */}
                            <div className="h-full flex-1 p-4 md:p-6">
                                <ReactWeather
                                    isLoading={isLoading}
                                    errorMessage={errorMessage}
                                    data={data}
                                    lang="en"
                                    locationLabel="Chittagong"
                                    unitsLabels={{temperature: 'C', windSpeed: 'Km/h'}}
                                    showForecast
                                />
                            </div>
                            {/*    Weather end*/}


                            {/*    Calender start*/}
                            <div className="flex-1 p-4 md:p-6">
                                <div
                                    className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
                                    <Calendar color='green'/>
                                </div>


                            </div>


                            {/*    calender end*/}


                        </div>


                    </div>


                </section>


            </div>
        </div>
    );
};

export default AdminStatistics;