import React from 'react';

import logo from '../../assets/images/logo.png'
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <section className="pt-10 pb-7 ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="grid grid-cols-1 min-[1130px]:grid-cols-12 gap-8 lg:gap-0 py-14 border-y-2 border-gray-200">
                        <div className="min-[1130px]:col-span-5 col-span-1 w-full min-[1130px]:max-w-full mx-auto">
                            <div className="flex flex-col max-sm:items-center gap-2 w-full ">
                                <Link to="/">
                                <div  className="py-1.5 ">
                                    <img width="150" src={logo} className="duration-500  hover:scale-110 hover:shadow-lg rounded-lg" />
                                </div>
                                </Link>
                                <div className="flex flex-col min-[470px]:flex-row items-center gap-3 w-full">
                                    <div className="relative  text-gray-500 focus-within:text-gray-900 max-sm:w-full">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 viewBox="0 0 20 20" fill="none">
                                                <path
                                                    d="M2.95739 5.61072L6.47281 7.80147C8.18826 8.87052 9.04599 9.40504 9.99991 9.40489C10.9538 9.40474 11.8114 8.86994 13.5265 7.80035L17.0509 5.60245M9.16667 16.6663H10.8333C13.976 16.6663 15.5474 16.6663 16.5237 15.69C17.5 14.7137 17.5 13.1424 17.5 9.99967C17.5 6.85698 17.5 5.28563 16.5237 4.30932C15.5474 3.33301 13.976 3.33301 10.8333 3.33301H9.16667C6.02397 3.33301 4.45262 3.33301 3.47631 4.30932C2.5 5.28563 2.5 6.85698 2.5 9.99967C2.5 13.1424 2.5 14.7137 3.47631 15.69C4.45262 16.6663 6.02397 16.6663 9.16667 16.6663Z"
                                                    stroke="#111827" stroke-width="1.6" stroke-linecap="round"
                                                    stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        <input type="text" id="default-search"
                                               className="block w-full max-sm:min-w-full sm:max-w-xs pr-4 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed"
                                               placeholder="mail@hrhub.com"/>
                                    </div>
                                    <button
                                        className="py-3 px-7 rounded-lg max-[470px]:w-full text-base font-semibold duration-500 bg-green-700 hover:bg-green-800 text-white transition hover:translate-y-1">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="min-[1130px]:col-span-7 max-[1130px]:pt-10 lg:pl-14 col-span-1 w-full min-[1130px]:max-w-full mx-auto flex flex-col sm:flex-row justify-between gap-6 ">
                            <div className="">
                                <h6 className="text-lg font-medium text-gray-900 mb-7 max-sm:text-center border-b-2 border-green-500">Address</h6>
                                <ul className="flex flex-col gap-6">
                                    <li><p href=""
                                           className="text-base font-normal max-sm:text-center  text-gray-600">
                                        California,
                                        Pleasanton, CA 94588,
                                        USA</p>
                                    </li>
                                    <li><p href=""
                                           className="text-base font-normal max-sm:text-center  text-gray-600">

                                        Ontario
                                        705 Cotton Mill Street,
                                        Canada
                                    </p>
                                    </li>

                                </ul>
                            </div>
                            <div className="">
                                <h6 className="text-lg font-medium text-gray-900 mb-7 max-sm:text-center border-b-2 border-green-500">Contact</h6>
                                <ul className="flex flex-col gap-6">
                                    <li><p
                                           className="text-base font-normal max-sm:text-center text-gray-600 whitespace-nowrap">
                                        +91 945 658 3256</p></li>
                                    <li><p
                                           className="text-base font-normal max-sm:text-center text-gray-600 whitespace-nowrap ">
                                        support@hrhub.com</p>
                                    </li>

                                </ul>
                            </div>
                            <div className="">
                                <h6 className="text-lg font-medium text-gray-900 mb-7 max-sm:text-center border-b-2 border-green-500">Office</h6>
                                <ul className="flex flex-col gap-6">
                                    <li><p
                                           className="text-base font-normal max-sm:text-center text-gray-600 whitespace-nowrap ">Monday
                                        - Friday</p>
                                    </li>
                                    <li><p
                                           className="text-base font-normal max-sm:text-center text-gray-600 whitespace-nowrap">9AM
                                        - 7PM</p></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex flex-col-reverse gap-5 md:flex-row items-center first-letter:items-center justify-between pt-7">
                        <p className="font-normal text-sm text-gray-400">© hrhub.com 2024,
                            All rights reserved.</p>
                        <ul className="flex items-center gap-9">
                            <li><a href=""
                                   className="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0">Terms</a>
                            </li>
                            <li><a href=""
                                   className="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0">Privacy</a>
                            </li>
                            <li><a href=""
                                   className="text-gray-500 text-sm font-normal transition-all duration-300 hover:text-indigo-600 focus-within:text-indigo-600 focus-within:outline-0">Cookies</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;