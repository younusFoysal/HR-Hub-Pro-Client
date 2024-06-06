import React from 'react';
import {Link} from "react-router-dom";

const Banner = () => {
    return (
        <div>

            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div className="relative mx-auto px-4 pt-1 sm:max-w-xl md:max-w-full md:px-8 lg:py-20 xl:px-20">
                <div className="mx-auto max-w-xl lg:max-w-screen-xl">
                    <div className="mb-16 text-center lg:mb-0 lg:max-w-lg lg:text-left">
                        <div className="mb-6 max-w-xl">
                            <div>
                                <p className="bg-teal-accent-400 mb-4 inline-block rounded-full bg-green-200 px-3 py-px text-sm font-semibold tracking-wider text-green-700">
                                    Welcome to HR Hub
                                </p>
                            </div>
                            <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight text-green-800 sm:text-5xl sm:leading-snug">
                                Effortlessly Manage Your Global

                                <span className="inline-block text-green-500"> Employee Data</span>
                            </h2>
                            <p className="text-base text-green-800 md:text-lg">
                                Manage your global workforce with a flexible, cloud-based employee database management
                                system.
                            </p>
                        </div>
                        <div
                            className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:justify-start">
                            <Link to="/login">
                            <div
                               className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green-500 px-6 font-medium tracking-wide text-white shadow-md outline-none transition  duration-200 hover:scale-105 hover:shadow-2xl hover:bg-green-400 focus:ring sm:w-auto">

                                Login Now </div>
                            </Link>

                            <Link to="/signup">
                            <div
                               className="inline-flex h-12 w-full items-center justify-center rounded-full border-2 border-green-500 px-4 font-semibold text-green-600 transition duration-500 hover:scale-105 hover:shadow-xl hover:bg-green-200 hover:border-green-700 hover:text-green-700 sm:w-auto">
                                Register</div>
                            </Link>
                        </div>


                    </div>
                    <div
                        className="hidden h-full justify-center overflow-hidden lg:absolute lg:bottom-0 lg:right-0 lg:flex lg:w-1/2 lg:items-end lg:justify-start">
                        <svg className="h-full w-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="img1" x="0" y="0" width="1" height="1">
                                    <image x="-3" y="-17" width="100%" height="100%"
                                           preserveAspectRatio="xMaxYMax slice"
                                           href="https://flytehcm.com/wp-content/uploads/2020/01/Employee-Achievement.jpeg"/>
                                </pattern>
                            </defs>

                            <path fill="url(#img1)"
                                  d="M40,-62.6C52.2,-54.5,62.5,-43.9,66.9,-31.4C71.3,-18.9,69.6,-4.6,65.9,8.3C62.2,21.1,56.4,32.5,49.2,45.2C42.1,57.9,33.7,72.1,22.2,75.3C10.7,78.5,-3.9,70.7,-14.8,62.1C-25.7,53.5,-32.8,44.1,-44.9,35.8C-57,27.5,-74,20.3,-82.1,7.7C-90.3,-4.8,-89.5,-22.7,-80.8,-34.8C-72,-46.9,-55.2,-53.3,-40.4,-60.2C-25.6,-67,-12.8,-74.3,0.6,-75.2C13.9,-76.1,27.9,-70.6,40,-62.6Z"
                                  transform="translate(100 100)"/>
                        </svg>
                    </div>
                </div>


            </div>


        </div>
    );
};

export default Banner;