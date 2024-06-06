import React, { useState } from 'react';
import LoadingSpinner from "../Shared/LoadingSpinner.jsx";
import useAxiosCommon from "../../hooks/useAxiosCommon.jsx";
import { useQuery } from "@tanstack/react-query";

const Testimonials = () => {
    const axiosCommon = useAxiosCommon();
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    // Fetch reviews Data
    const {
        data: reviews = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/reviews`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    const handlePrevClick = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const currentReview = reviews[currentReviewIndex];

    return (
        <div>
            <section className="py-6 text-blue-900 sm:py-16 lg:py-10">
                <div className="relative mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <div className="text-center">
                            <p className="text-lg font-medium text-green-700">
                                What clients say about their experience with us
                            </p>
                            <h2 className="mt-4 text-3xl font-bold text-green-800 sm:text-4xl xl:text-5xl">
                                Client Testimonials
                            </h2>
                        </div>
                        <div className="relative mx-auto max-w-lg sm:mt-10 lg:gap-2 overflow-hidden">

                            <div className="flex" style={{
                                transform: `translateX(-${currentReviewIndex * 100}%)`,
                                transition: 'transform 0.5s ease'
                            }}>
                                {reviews.map((review, index) => (
                                    <div key={review._id}
                                         className="w-full flex-shrink-0 flex justify-center items-center">
                                        {index === currentReviewIndex && (
                                            <div className="flex flex-col overflow-hidden">
                                                <div
                                                    className="flex flex-1 flex-col justify-between p-6 lg:py-8 lg:px-7">
                                                    <div className="flex flex-col items-center text-center">
                                                        <span
                                                            className="rounded-full bg-green-500 p-3 text-5xl text-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                                                 role="img" width="1em" height="1em"
                                                                 preserveAspectRatio="xMidYMid meet"
                                                                 viewBox="0 0 16 16">
                                                                <path fill="currentColor" fillRule="evenodd"
                                                                      d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z"
                                                                      clipRule="evenodd"/>
                                                            </svg>
                                                        </span>
                                                        <blockquote className="mt-8 flex-1">
                                                            <p className="max-w-xl text-lg font-medium leading-relaxed text-green-500">
                                                                "{review.review_text}"
                                                            </p>
                                                        </blockquote>
                                                    </div>
                                                    <div className="mx-auto mt-8 flex items-center">
                                                        <div className="ml-4 text-center">
                                                            <p className="text-base font-bold text-green-600">
                                                                {review.name}
                                                            </p>
                                                            <p className="text-green-600 mt-0.5 text-sm">
                                                                {review.designation}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}


                            </div>

                            <div className="flex justify-center space-x-2">
                                <span onClick={handlePrevClick}
                                      className="cursor-pointer rounded-full border p-3 hover:bg-green-50 transition duration-500 hover:-translate-x-1 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                    </svg>
                                </span>
                                <span onClick={handleNextClick}
                                      className="cursor-pointer rounded-full border p-3 hover:bg-green-50 transition duration-500 hover:translate-x-1 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                    </svg>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
