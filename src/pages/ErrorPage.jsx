import { useNavigate } from 'react-router-dom'
import {FaArrowLeftLong} from "react-icons/fa6";
import {RiErrorWarningLine} from "react-icons/ri";
import {IoMdHome} from "react-icons/io";

const ErrorPage = () => {
    const navigate = useNavigate()

    return (
        <section className='bg-white '>
            <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
                <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
                    <p className='p-3 font-medium text-yellow-500 rounded-full bg-blue-50 '>
                        <RiErrorWarningLine className="text-4xl text-yellow-500"> </RiErrorWarningLine>
                    </p>
                    <h1 className='mt-3 text-2xl font-semibold text-gray-800  md:text-3xl'>
                        Something Went Wrong!
                    </h1>
                    <p className='mt-4 text-gray-500 '>Here are some helpful links:</p>

                    <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
                        <button
                            onClick={() => navigate(-1)}
                            className=' btn btn-outline flex items-center justify-center w-1/2 px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-green-500 sm:w-auto'
                        >
                            <FaArrowLeftLong ></FaArrowLeftLong>

                            <span>Go back</span>
                        </button>

                        <button className="btn btn-outline hover:bg-green-500" onClick={() => navigate('/')}>
                            <IoMdHome > </IoMdHome>  Home
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ErrorPage
