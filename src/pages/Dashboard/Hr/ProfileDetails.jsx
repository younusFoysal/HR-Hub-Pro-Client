import React from 'react';
import {useLoaderData} from "react-router-dom";
import avatar from '../../../assets/images/avatar.png'
import toast from "react-hot-toast";
import { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Cell } from 'recharts';
import {useQuery} from "@tanstack/react-query";
import {axiosSecure} from "../../../hooks/useAxiosSecure.jsx";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const ProfileDetails = () => {

    const datao = [
        { name: 'OCT \'23', value: 110 },
        { name: 'NOV \'23', value: 100 },
        { name: 'DEC \'23', value: 105 },
        { name: 'JAN \'24', value: 150 },
    ];


    const dataw = [
        { name: "JUN '24", salary: 200 },
        { name: "JUL '24", salary: 200 }
    ];

    const dataq = [
        {
            "month": 6,
            "year": 2024,
            salary: 200
        },
        {
            "month": 5,
            "year": 2024,
            salary: 200
        }
    ];





    const {
        _id,
        email,
        bankaccount,
        designation,
        isVerfied,
        photo,
        role,
        salary,
        timestamp,
        name,
        isVerified
    } = useLoaderData()
    //console.log(user)

    const {
        data = [],
        isLoading
    } = useQuery({
        queryKey: ['salarysummary', email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/salarysummary/${email}`)
            return data
        },
    })

    if (!designation){
        toast((t) => (
            <span>
                ⚠️ Please Update your <b> Profile!  </b>
                <button className="btn btn-sm" onClick={() => toast.dismiss(t.id)}>
                     OK
                </button>
            </span>
        ));
    }

    return (
        <div>
            <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4 text-lime-500  font-sans font-bold border-lime-400">
                Profile: {name}
            </h1>

            <div className="flex flex-row gap-4 items-end ">


                <div
                    className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
                    <div className="rounded-t-lg h-32 overflow-hidden">
                        <img className="object-cover object-top w-full"
                             src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
                             alt='Mountain'/>
                    </div>
                    <div
                        className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                        <img className="object-cover object-center h-32" src={photo ? photo : avatar}
                             alt='Woman looking front'/>
                    </div>
                    <div className="text-center mt-2">
                        <h2 className="font-semibold">{name}</h2>
                        <p className="text-gray-500">{designation}</p>
                    </div>

                    <div className="p-4 border-t mx-8 mt-2">
                        <button
                            className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Follow
                        </button>
                    </div>
                </div>

                <div>

                    <BarChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" label={{ value: 'Month', position: 'insideBottom', offset: -10 }} />
                        <YAxis
                            label={{ value: 'Salary ($)', angle: -90, position: 'insideLeft' }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip formatter={(value) => `$${value}`} />
                        {/*<Legend />*/}
                        <Bar dataKey="salary" barSize={60}>
                            <Cell fill="#00C49F" />  {/* Green */}
                            <Cell fill="#FF8042" />  {/* Orange */}
                            <Cell fill="#FFBB28" />  {/* Yellow */}
                            <Cell fill="#00C1F4" />  {/* Blue */}
                            <LabelList dataKey="salary" position="top" formatter={(value) => `$${value}`} />
                        </Bar>
                    </BarChart>

                </div>

            </div>

        </div>
    );
};

export default ProfileDetails;