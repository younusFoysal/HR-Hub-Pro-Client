import React from 'react';
import LoadingSpinner from "../../../components/Shared/LoadingSpinner.jsx";
import useRole from "../../../hooks/useRole.js";
import AdminStatistics from "../Admin/AdminStatistics.jsx";
import HrStatistics from "../Hr/HrStatistics.jsx";
import EmployeeStatistics from "../Employee/EmployeeStatistics.jsx";

const Statistics = () => {
    const [role, isLoading] = useRole()
    if (isLoading) return <LoadingSpinner />
    return (
        <>
            {role === 'admin' && <AdminStatistics />}
            {role === 'hr' && <HrStatistics/>}
            {role === 'employee' && <EmployeeStatistics/>}
        </>
    );
};

export default Statistics;