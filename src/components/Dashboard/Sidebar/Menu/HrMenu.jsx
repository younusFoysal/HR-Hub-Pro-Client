import { BsFingerprint } from 'react-icons/bs'
import { CiViewList } from "react-icons/ci";
import { GrUserAdmin } from 'react-icons/gr'
import { useState } from 'react'
import MenuItem from './/MenuItem'
import useRole from '../../../../hooks/useRole'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useAuth from '../../../../hooks/useAuth.js'


const HrMenu = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [role] = useRole()
    // for modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const modalHandler = async () => {
        console.log('I want to be a host')
        try {
            const currentUser = {
                email: user?.email,
                role: 'guest',
                status: 'Requested',
            }
            const { data } = await axiosSecure.put(`/user`, currentUser)
            console.log(data)
            if (data.modifiedCount > 0) {
                toast.success('Success! Please wait for admin confirmation')
            } else {
                toast.success('Please!, Wait for admin approval👊')
            }
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally {
            closeModal()
        }
    }
    return (
        <>

            <MenuItem
                icon={BsFingerprint}
                label='Employee Llist'
                address='employee-list'
            />
            <MenuItem
                icon={CiViewList}
                label='Work Records'
                address='progress'
            />





        </>
    )
}

export default HrMenu
