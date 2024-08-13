import React, {useEffect} from 'react';
import {FaList} from "react-icons/fa";
import {AiOutlineDatabase, AiOutlineSafety} from "react-icons/ai";
import {MdMobileFriendly, MdOutlineSettingsSuggest} from "react-icons/md";
import {LuUserSquare} from "react-icons/lu";
import {PiVideoConferenceDuotone} from "react-icons/pi";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000, // Set the animation duration in milliseconds
            easing: 'ease-in-out', // You can choose the easing option you prefer
            once: true, // Animation will only run once
        });
    }, []);

    return (
        <div>

            <section className="mx-auto px-6 text-gray-800 md:max-w-screen-xl">
                <div className="mx-auto mt-20 mb-16 block px-6 text-center">
                    <h2 className="mx-auto text-4xl font-bold md:text-5xl">Our Services</h2>
                    <div
                        className="mx-auto mt-6 mb-auto block w-full text-xl font-normal leading-9 text-gray-700 md:w-3/4 xl:w-3/4">
                        <p className="text-lg">Divide Your Workforce Into Departments, Locations, and Job Roles. Set the foundation for error-free management, from payroll and admin actions to performance and development.</p>
                    </div>
                </div>

                <div className="grid gap-10 pb-20 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm hover:bg-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" data-aos="fade-right">
                        <div className="my-4 flex items-center">
                            <div
                                className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-green-100 text-2xl text-green-500">

                                <AiOutlineDatabase />
                            </div>
                            <h3 className="text-2xl font-bold md:text-xl">Visibility </h3>
                        </div>
                        <p className="text-gray-700">Increase employee data visibility across regions.</p>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm hover:bg-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" data-aos="fade-right">
                        <div className="my-4 flex items-center">
                            <div
                                className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-green-100 text-2xl text-green-500">

                                <AiOutlineSafety />
                            </div>
                            <h3 className="text-2xl font-bold md:text-xl">Guarantee</h3>
                        </div>
                        <p className="text-gray-700">
                            Guarantee secure data management and employee privacy.
                        </p>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm hover:bg-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" data-aos="fade-right">
                        <div className="my-4 flex items-center">
                            <div
                                className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-green-100 text-2xl text-green-500">

                                <MdOutlineSettingsSuggest />
                            </div>
                            <h3 className="text-2xl font-bold md:text-xl">Customization</h3>
                        </div>
                        <p className="text-gray-700">Customize and manage your workforce in your preferred way.</p>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm hover:bg-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" data-aos="fade-left">
                        <div className="my-4 flex items-center">
                            <div
                                className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-green-100 text-2xl text-green-500">

                                <LuUserSquare />
                            </div>
                            <h3 className="text-2xl font-bold md:text-xl">Empowerment</h3>
                        </div>
                        <p className="text-gray-700">Empower your employees with self-service portals.</p>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm hover:bg-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" data-aos="fade-left">
                        <div className="my-4 flex items-center">
                            <div
                                className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-green-100 text-2xl text-green-500">

                                <MdMobileFriendly />
                            </div>
                            <h3 className="text-2xl font-bold md:text-xl">Access </h3>
                        </div>
                        <p className="text-gray-700">Access your database quickly and easily from your mobile device.</p>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-white p-8 shadow-sm hover:bg-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1" data-aos="fade-left">
                        <div className="my-4 flex items-center">
                            <div
                                className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg border bg-green-100 text-2xl text-green-500">

                                <PiVideoConferenceDuotone />
                            </div>
                            <h3 className="text-2xl font-bold md:text-xl">Recruitment</h3>
                        </div>
                        <p className="text-gray-700">Streamline your hiring process with advanced recruitment and onboarding solutions.</p>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Services;