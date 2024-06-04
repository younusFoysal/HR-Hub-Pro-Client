import React, {useState} from 'react';
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure, {axiosSecure} from "../../../hooks/useAxiosSecure.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";

const Profile = () => {

    const {user} = useAuth();
    //console.log(user)
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);


    // Fetch Employees
    const { data: userdata = [], isLoading, refetch } = useQuery({
        queryKey: ['profile-data'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user.email}`);
            return data;
        },
    });

    //console.log(userdata)

    const { mutateAsync } = useMutation({
        mutationFn: async userProfile => {
            const { data } = await axiosSecure.patch(`/users/update/${userProfile.email}`, userProfile);
            return data;
        },
        onSuccess: data => {
            refetch();
            toast.success('Employee status updated successfully');
        },
        onError: error => {
            toast.error(`Failed to update status: ${error.message}`);
        }
    });


    const handleUpdate = async (e) => {
        e.preventDefault()

        const form = e.target

        const name = form.name.value
        const designation = form.designation.value
        const bankaccount = Number(form.bankaccount.value)
        const salary = Number(form.salary.value)


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to change Salary in future!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update!"
        }).then( async (result) => {
            if (result.isConfirmed) {

                const userProfile = {
                    email: userdata.email,
                    name,
                    designation,
                    bankaccount,
                    salary
                };

                try {
                    await mutateAsync(userProfile);

                    await Swal.fire({
                        title: "Updated!",
                        text: "Your profile has been Updated.",
                        icon: "success"
                    });

                } catch (err) {
                    toast.error(err.message);
                }


            }
        });

    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <section className="py-10 my-auto ">
                <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                    <div
                        className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center ">

                        <div className="">
                            <h1
                                className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 ">
                                Profile of {userdata.name}
                            </h1>
                            <h2 className="text-grey text-sm mb-4 ">Update Your Profile</h2>
                            <form onSubmit={handleUpdate}>

                                <div className="w-full rounded-sm items-center">
                                        <img className="mx-auto rounded-full h-36 w-36"
                                             src={userdata.photo}
                                             alt="User"/>


                                </div>
                                <h2 className="text-center mt-1 font-semibold ">
                                    If you loggedIn with Social, <br/> Update Designation, Bank Account Number, Salary.
                                </h2>
                                <div
                                    className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                    <div className="w-full  mb-4 mt-6">
                                        <label htmlFor="" className="mb-2 ">First Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={userdata.name}
                                            className="mt-2 p-4 w-full border-2 rounded-lg "
                                            placeholder="First Name"
                                        />
                                    </div>
                                </div>
                                <div
                                    className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                    <div className="w-full mb-4">
                                        <label htmlFor="" className="mb-2 ">Designation</label>
                                        <input
                                            type="text"
                                            name="designation"
                                            defaultValue={userdata.designation}
                                            className="mt-2 p-4 w-full border-2 rounded-lg "
                                            placeholder="Ex: Sales Executive, DevOps Engr, MERN Developer"
                                        />
                                    </div>
                                </div>

                                <div
                                    className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                    <div className="w-full">
                                        <h3 className=" mb-2">Bank Account Number</h3>
                                        <input
                                            type="number"
                                            name="bankaccount"
                                            defaultValue={userdata.bankaccount}
                                            placeholder="Ex: 171792326612"

                                            className="text-grey p-4 w-full border-2 rounded-lg "/>
                                    </div>
                                    <div className="w-full">
                                        <h3 className=" mb-2">Salary</h3>
                                        <input
                                            type="number"
                                            disabled={userdata.salary ? "disabled" : ""}
                                            name="salary"
                                            defaultValue={userdata.salary}
                                            placeholder="Ex: 35000"
                                            className="text-grey p-4 w-full border-2 rounded-lg "/>
                                    </div>
                                </div>
                                <div className="w-full rounded-lg bg-lime-500 hover:bg-lime-600 mt-4 text-white text-lg font-semibold">
                                    <button type="submit" className="w-full p-4">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Profile;