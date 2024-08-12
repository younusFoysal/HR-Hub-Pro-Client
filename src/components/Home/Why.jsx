import React, {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Why = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000, // Set the animation duration in milliseconds
            easing: 'ease-in-out', // You can choose the easing option you prefer
            once: true, // Animation will only run once
        });
    }, []);

    return (
        <div>

            <section className="mx-auto max-w-screen-xl py-6 text-green-600 sm:py-8 lg:py-10">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-medium text-green-700">INTRODUCING</p>
                        <h2 className="mt-2 text-3xl font-bold sm:text-4xl xl:text-5xl">The Future of Analytics</h2>
                        <hr className="mx-auto mt-4 h-2 w-32 border-none bg-green-700"/>
                    </div>

                    <div
                        className="agrid-rows-[repeat(2,_minmax(1px,fit-content))] mt-10 grid grid-cols-1 gap-10 text-center sm:mx-auto sm:max-w-sm md:mt-20 md:h-[68rem] md:max-w-full md:grid-cols-2 md:grid-rows-5 md:text-left ">
                        <div className="row-span-3 bg-green-200 md:px-8 transition duration-500 hover:scale-105 hover:shadow-xl" data-aos="fade-up-right">
                            <img className="h mx-auto object-contain md:ml-0" src="https://i.ibb.co/2jb05K9/y4-CZSruo-Lg-Kd-A6-Y6mz-Qn-T.png"
                                 alt=""/>
                            <div className="">
                                <h3 className="text-4xl">Have deeper insights</h3>
                                <p className="mt-6 text-base">Seamlessly network one-to-one architectures vis-a-vis turnkey niche markets.</p>
                                <button
                                    className="mt-4 rounded-lg bg-green-700 hover:bg-green-800 px-6 py-2 text-white transition hover:translate-y-1">Learn
                                    more
                                </button>
                            </div>
                        </div>

                        <div className="row-span-2 bg-green-200 md:flex md:flex-col md:justify-center md:px-8 transition duration-500 hover:scale-105 hover:shadow-xl" data-aos="fade-up-left">
                            <div className="">
                                <h3 className="text-4xl">Get advantage over others</h3>
                                <p className="mt-6 text-base">Energistically maximize multidisciplinary customer service after open-source expertise.</p>
                                <button
                                    className="mt-4 rounded-lg bg-green-700 hover:bg-green-800 px-6 py-2 text-white transition hover:translate-y-1">Learn
                                    more
                                </button>
                            </div>
                        </div>

                        <div className="row-span-3 bg-green-200 md:flex md:flex-col md:justify-center md:px-8 transition duration-500 hover:scale-105 hover:shadow-xl" data-aos="fade-up-left">
                            <img className="mx-auto object-contain md:ml-0" src="https://i.ibb.co/VHP8V7D/6-SD-s9-Dep-Fa-NBNOe-FKeo-G.png"
                                 alt=""/>
                            <div className="">
                                <h3 className="text-4xl">Recover lost revenue</h3>
                                <p className="mt-6 text-base">Efficiently e-enable enabled imperatives with synergistic mindshare. Globally.</p>
                                <button
                                    className="mt-4 rounded-lg bg-green-700 hover:bg-green-800 px-6 py-2 text-white transition hover:translate-y-1">Learn
                                    more
                                </button>
                            </div>
                        </div>

                        <div className="row-span-2 bg-green-200 md:flex md:flex-col md:justify-center md:px-8 transition duration-500 hover:scale-105 hover:shadow-xl" data-aos="fade-up-right">
                            <div className="">
                                <h3 className="text-4xl">Improve Customer Loyalty</h3>
                                <p className="mt-6 text-base">Dynamically pursue real-time total linkage with dynamic web-readiness.</p>
                                <button
                                    className="mt-4 rounded-lg bg-green-700 hover:bg-green-800 px-6 py-2 text-white transition hover:translate-y-1">Learn
                                    more
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Why;