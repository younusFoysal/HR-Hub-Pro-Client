import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import {BsFingerprint} from "react-icons/bs";
import { PiUsersThreeLight } from "react-icons/pi";

const AdminMenu = () => {
    return (
        <>
            <MenuItem
                icon={PiUsersThreeLight}
                label='All Employee Llist'
                address='all-employee-list'
            />
        </>
    )
}

export default AdminMenu
