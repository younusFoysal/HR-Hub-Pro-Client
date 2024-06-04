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
