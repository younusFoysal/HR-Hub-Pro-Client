import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'
import PropTypes from 'prop-types'

const HrRoute = ({ children }) => {

    const [role, isLoading] = useRole()

    if (isLoading) return <LoadingSpinner />
    if (role === 'hr') return children
    return <Navigate to='/dashboard' />

};

export default HrRoute;

HrRoute.propTypes = {
    children: PropTypes.element,
}