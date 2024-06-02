import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const EmployeeMenu = () => {
    return (
        <>
            <MenuItem
                icon={BsFillHouseAddFill}
                label='Work Sheet'
                address='work-sheet' />

            <MenuItem
                icon={MdOutlineManageHistory}
                label='Payment History'
                address='payment-history'
            />
        </>
    )
}

export default EmployeeMenu
