import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './CheckoutForm.css'
import { ImSpinner9 } from 'react-icons/im'
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import PropTypes from 'prop-types'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {useQuery} from "@tanstack/react-query";

const CheckoutForm = ({selectedEmployee, refetch, closeModal}) => {

    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState()
    const [cardError, setCardError] = useState('')
    const [processing, setProcessing] = useState(false)

    //   get clientSecret
    const getClientSecret = async salary => {
        const { data } = await axiosSecure.post(`/create-payment-intent`, salary)
        console.log('clientSecret from server--->', data)
        setClientSecret(data.clientSecret)
    }

    useEffect(() => {
        // fetch client secret
        if (selectedEmployee?.salary && selectedEmployee?.salary > 1) {
            getClientSecret({ salary: selectedEmployee?.salary })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedEmployee?.salary])


    // get employee paid salary months years
    const {
        data: salarymonthyear = [],
        isLoading
    } = useQuery({
        queryKey: ['salarymonthyear', selectedEmployee?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/salarymonthyear/${selectedEmployee?.email}`)
            return data
        },
    })


    // /salarymonthyear/:email

    console.log(salarymonthyear)

    const handleSubmit = async event => {
        // Block native form submission.
        event.preventDefault()

        const form = event.target

        const month = Number(form.month.value)
        const year =  Number(form.year.value)

        const date = {month, year}
        const dateExists = salarymonthyear.some(salary => salary.month === date.month && salary.year === date.year);

        if (dateExists){
            return toast.error("You can't pay twice for the same month/year!")
        }

        setProcessing(true)
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement)

        if (card == null) {
            return
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('[error]', error)
            setCardError(error.message)
            setProcessing(false)
            return
        } else {
            console.log('[PaymentMethod]', paymentMethod)
            setCardError('')
        }

        // confirm payment
        const { error: confirmError, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName,
                    },
                },
            })

        if (confirmError) {
            console.log(confirmError)
            setCardError(confirmError.message)
            setProcessing(false)
            return
        }

        if (paymentIntent.status === 'succeeded') {
            console.log(paymentIntent)


            // 1. Create payment info object
            const paymentInfo = {
                ...selectedEmployee,
                month: month,
                year: year,
                employeeId: selectedEmployee._id,
                transactionId: paymentIntent.id,
                date: new Date(),
            }

            delete paymentInfo._id
            console.log(paymentInfo)
            try {
                // 2. save payment info in booking collection (db)
                const { data } = await axiosSecure.post('/paysalary', paymentInfo)
                console.log(data)


                // update ui
                refetch()
                closeModal()
                toast.success('Employee Paid Successfully')
                //navigate('/dashboard/my-bookings')
            } catch (err) {
                console.log(err)
            }


        }

        setProcessing(false)
    }



    return (
        <>
            {' '}
            <form onSubmit={handleSubmit}>


                <div className="mb-4 flex items-center">
                    <label
                        htmlFor="month"
                        className="block w-1/6 text-gray-700 text-lg font-bold mb-2 mr-2"
                    >
                        Month:
                    </label>
                    <input
                        type="number"
                        id="month"
                        name="month"
                        placeholder="Ex: 07"
                        className="flex-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label
                        htmlFor="year"
                        className="block w-1/6 text-gray-700 text-lg font-bold mb-2 mr-2"
                    >
                        Year:
                    </label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        placeholder="Ex: 2024"
                        className="flex-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>


                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <div className='flex mt-2 justify-around'>
                    <button
                        // disabled={!stripe || !clientSecret || processing}
                        type='submit'
                        className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                    >
                        {processing ? (
                            <ImSpinner9 className='animate-spin m-auto' size={24}/>
                        ) : (
                            `Pay ${selectedEmployee?.salary}`
                        )}
                    </button>
                    <button
                        onClick={closeModal}
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    >
                        Cancel
                    </button>
                </div>
            </form>
            {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
        </>
    );
};

export default CheckoutForm;