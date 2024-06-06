import React, {useEffect, useState} from 'react';
import {FaMapLocation} from "react-icons/fa6";
import {useMutation} from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon.jsx";
import toast from "react-hot-toast";
import LoadingSpinner from "../Shared/LoadingSpinner.jsx";

const ContactUs = () => {

    const [loading, setLoading] = useState(false)
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const now = new Date();

        // Convert to GMT+6
        const gmt6Offset = 6 * 60 * 60 * 1000;
        const gmt6Date = new Date(now.getTime() + gmt6Offset);

        // Format date as YYYY-MM-DD
        const year = gmt6Date.getUTCFullYear();
        const month = String(gmt6Date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(gmt6Date.getUTCDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // Format time as HH:MM AM/PM
        let hours = gmt6Date.getUTCHours();
        const minutes = String(gmt6Date.getUTCMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

        // Set the formatted date and time
        setCurrentDate(formattedDate);
        setCurrentTime(formattedTime);
    }, []);


    const axiosCommon = useAxiosCommon()

    //   Fetch msg Data
    const { mutateAsync } = useMutation({
        mutationFn: async workData => {
            const { data } = await axiosCommon.post(`/contact`, workData)
            return data
        },
        onSuccess: () => {
            console.log('Data Saved Successfully')
            toast.success('Message sent Successfully!')
            setLoading(false)
        },
    })


    const handleContact = async (e) => {
        e.preventDefault()
        setLoading(true)

        const form = e.target

        const name = form.name.value
        const email = form.email.value
        const message = form.message.value
        const date = form.date.value
        const time = form.time.value

        console.log()

        try {
            const msgData = {
                name,
                email,
                message,
                date,
                time
            }
            console.log(msgData)

            //   Post request to server
            await mutateAsync(msgData)
        } catch (err) {
            console.log(err)
            toast.error(err.message)
            setLoading(false)
        }


    }

    if (loading) return toast("Wait...Message is sending...")


    return (
        <div>
            <div className="container mt-20 mx-auto px-2 md:px-4">

                <section className="mb-12">

                    <div className="flex justify-center">
                        <div className="mx-auto mt-6 mb-16 block px-6 text-center">
                            <h2 className="mx-auto text-4xl font-bold md:text-5xl">Contact Us</h2>
                            <div
                                className="mx-auto mt-6 mb-auto block w-full text-xl font-normal leading-9 text-gray-700 md:w-3/4 xl:w-3/4">
                                <p className="text-lg">
                                    Progressively enhance economically sound leadership skills for 24/7 core competencies. Appropriately customize maintainable.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap">

                        <form
                            onSubmit={handleContact}
                            className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">

                            <div className="mb-3 w-full">
                                <label className="block font-medium mb-[2px] text-teal-700" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    className="px-2 py-2 border w-full outline-none rounded-md"
                                    id="name"
                                    required
                                    placeholder="Name"
                                />
                            </div>

                            <div className="mb-3 w-full">
                                <label className="block font-medium mb-[2px] text-teal-700" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    autoComplete="email"
                                    className="px-2 py-2 border w-full outline-none rounded-md"
                                    id="email"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>

                            <div className="mb-3 w-full">
                                <label className="block font-medium mb-[2px] text-teal-700" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    className="px-2 py-2 border rounded-[5px] w-full outline-none"
                                    name="message"
                                    id="message"
                                    required
                                ></textarea>
                            </div>
                            <input
                                type="date"
                                name="date"
                                hidden
                                value={currentDate}
                            />
                            <input
                                type="text"
                                name="time"
                                hidden
                                value={currentTime}
                            />

                            <button type="submit"
                                    className="mb-6 inline-block w-full rounded bg-green-500 px-6 py-2.5 font-medium uppercase leading-normal text-white shadow-lg hover:bg-green-700 transition duration-500 hover:scale-105 hover:shadow-xl">
                                Send
                            </button>

                        </form>

                        <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                            <div className="flex flex-wrap">
                                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="2" stroke="currentColor" className="h-6 w-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-bold">
                                                Technical support
                                            </p>
                                            <p className="text-neutral-500 ">
                                                support@hrhub.com
                                            </p>
                                            <p className="text-neutral-500 ">
                                                +1 234-567-87
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="2" stroke="currentColor" className="h-6 w-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-bold ">
                                                Sales questions
                                            </p>
                                            <p className="text-neutral-500 ">
                                                sales@hrhub.com
                                            </p>
                                            <p className="text-neutral-500 ">
                                                +1 234-567-88
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                                    <div className="align-start flex">
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                                                <FaMapLocation></FaMapLocation>
                                            </div>
                                        </div>
                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-bold ">Address</p>
                                            <p className="text-neutral-500 ">
                                                California, Pleasanton, USA

                                            </p>
                                            <br/>
                                            <p className="text-neutral-500 ">
                                                Ontario 705 Cotton Mill Street, Canada
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                                    <div className="align-start flex">
                                        <div className="shrink-0">
                                            <div className="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="2" stroke="currentColor" className="h-6 w-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-6 grow">
                                            <p className="mb-2 font-bold">
                                                Bug report
                                            </p>
                                            <p className="text-neutral-500 ">
                                                bugs@hrhub.com
                                            </p>
                                            <p className="text-neutral-500">
                                                +1 234-567-90
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>

        </div>
    );
};

export default ContactUs;