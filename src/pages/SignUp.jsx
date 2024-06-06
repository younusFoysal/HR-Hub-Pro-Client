import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { imageUpload } from '../api/utils'
import { useState } from 'react'
import {axiosCommon} from "../hooks/useAxiosCommon.jsx";
import {useQuery} from "@tanstack/react-query";
import {SiSpinrilla} from "react-icons/si";

const SignUp = () => {
    const navigate = useNavigate()
    const {
        createUser,
        signInWithGoogle,
        updateUserProfile,
        loading,
        setLoading,
        saveUser,
        logOut
    } = useAuth()

    const [selectedRole, setSelectedRole] = useState('')
    const [email, setEmail] = useState('')

    // Fetch Employees
    const { data: userL = [], isLoading, refetch } = useQuery({
        queryKey: ['userIsFired', email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/user/${email}`);
            console.log("Email:", email);
            return data;
        },
    });

    console.log("Outside", userL)

    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target

        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const image = form.image.files[0]
        const role = selectedRole
        const bankaccount = Number(form.bankaccount.value)
        const salary = Number(form.salary.value)
        const designation = form.designation.value


        // Validate password
        if (password.length < 6) {
            toast.error('Password is less than 6 characters')
            return
        }

        if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least one capital letter')
            return
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            toast.error('Password must contain at least one special character')
            return
        }

        if (!role) {
            toast.error('Please select a role')
            return
        }

        try {
            setLoading(true)
            // 1. Upload image and get image url
            const photo = await imageUpload(image)
            console.log(photo)
            // 2. User Registration
            const result = await createUser(email, password)
            console.log(result)

            // 3. Save username and photo in firebase
            await updateUserProfile(name, photo)
            // 4. Save user to the database with role
            await saveUser(
                result.user,
                name,
                role,
                bankaccount,
                salary,
                designation,
                photo
                )
            navigate('/')
            toast.success('Signup Successful')
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    // handle google signin
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle()
            console.log(result)

            const email = result.user.email
            setEmail(email)

            const {data: refetchedData} = await refetch();
            console.log("Inside Function:", email, refetchedData);


            if (refetchedData.isFired===true){
                setLoading(false)
                logOut();
                return toast.error("You are Fired! You can't Login.")
            }else {
            const role = "employee"
            const name = result.user.displayName
            const photo = result.user.photoURL
            const bankaccount = null
            const salary = null
            const designation = null


            await saveUser(
                result.user,
                name,
                role,
                bankaccount,
                salary,
                designation,
                photo
            )
            //console.log(saveUser)
            navigate('/')
            toast.success('Signup Successful')

        }

        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }

    const handleRoleSelect = (role) => {
        setSelectedRole(role)
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 shadow-2xl shadow-gray-500 duration-500 hover:scale-105'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                    <p className='text-sm text-gray-400'>Welcome to HR Hub</p>
                </div>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='space-y-4'>


                        <div className='relative inline-block text-left w-full'>
                            <label htmlFor='role' className='block mb-2 text-sm'>
                                Select Role
                            </label>
                            <div className='group w-full'>
                                <button
                                    type='button'
                                    className='inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:bg-lime-700 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                >
                                    {selectedRole ? selectedRole : 'Select Role'}
                                    <svg
                                        className='w-4 h-4 ml-2 -mr-1'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M10 12l-5-5h10l-5 5z'
                                        />
                                    </svg>
                                </button>
                                <div
                                    className='w-full absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300'>
                                    <div className='py-1'>
                                        <a
                                            href='#'
                                            className='w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                            onClick={() => handleRoleSelect('employee')}
                                        >
                                            Employee
                                        </a>
                                        <a
                                            href='#'
                                            className='w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 '
                                            onClick={() => handleRoleSelect('hr')}
                                        >
                                            HR
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div>
                            <label htmlFor='name' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                data-temp-mail-org='0'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor='accountNum' className='block mb-2 text-sm'>
                                Bank Account Number
                            </label>
                            <input
                                type='number'
                                name='bankaccount'
                                id='accountNum'
                                placeholder='Enter Your Bank Account Number'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                data-temp-mail-org='0'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor='salary' className='block mb-2 text-sm'>
                                Salary
                            </label>
                            <input
                                type='number'
                                name='salary'
                                id='salary'
                                placeholder='Enter Your salary Ammount Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                data-temp-mail-org='0'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor='designation' className='block mb-2 text-sm'>
                                Designation
                            </label>
                            <input
                                type='text'
                                name='designation'
                                id='designation'
                                placeholder='Ex: Sales Assistant, Social Media executive, Digital Marketer'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                data-temp-mail-org='0'
                                required
                            />
                        </div>


                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                                data-temp-mail-org='0'

                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                autoComplete='new-password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900 shadow-lg duration-200 hover:scale-105 hover:shadow-2xl'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            disabled={loading}
                            type='submit'
                            className='bg-green-500 w-full rounded-md py-3 text-white shadow-xl duration-200 hover:scale-105 hover:shadow-2xl'
                        >
                            {loading ? (
                                <SiSpinrilla className='animate-spin m-auto'/>
                            ) : (
                                'Continue'
                            )}
                        </button>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Signup with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <button
                    disabled={loading}
                    onClick={handleGoogleSignIn}
                    className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer duration-200 hover:scale-105 hover:shadow-2xl'
                >
                    <FcGoogle size={32}/>
                    <p>Continue with Google</p>
                </button>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-green-500 text-gray-600'
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default SignUp
