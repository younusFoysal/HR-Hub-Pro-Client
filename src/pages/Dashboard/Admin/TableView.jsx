import React from 'react';

const TableView = ({ employees, handleRoleToggle, handleAdjustSalary, handleFire, loggedInUser }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full table-auto ">
            <thead>
            <tr className="bg-gray-100">
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Designation</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Update Role</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Action</th>
            </tr>
            </thead>
            <tbody className="bg-white">
            {employees.map(employee => (
                <tr key={employee._id}>
                    <td className="py-4 px-6 border-b border-gray-200">{employee.name}</td>
                    <td className="py-4 px-6 border-b border-gray-200 truncate">{employee.designation}</td>
                    <td className="py-4 px-6 border-b border-gray-200">
                        <button
                            className={`btn btn-sm inline-flex text-xs hover:-translate-y-1 hover:shadow-gray-400 hover:shadow-xl leading-5 font-semibold rounded bg-${employee.isVerfied ? 'green' : 'red'}-100 text-${employee.isVerfied ? 'green' : 'red'}-800`}
                            onClick={() => handleRoleToggle(employee.email, employee.role)}
                        >
                            {employee.role === "hr" ? "Make Employee" : "Make HR"}
                        </button>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                        <button
                            onClick={() => handleAdjustSalary(employee.email, employee.salary)}
                            disabled={employee.isFired}
                            className="btn btn-sm mr-2 bg-green-500 text-white py-1 px-2 rounded text-xs disabled:text-black disabled:font-bold"
                        >
                            Adjust Salary
                        </button>
                        <button
                            onClick={() => handleFire(employee.email, employee.isFired)}
                            disabled={employee.isFired}
                            className="btn btn-sm bg-red-500 text-white py-1 px-2 rounded text-xs disabled:text-black disabled:font-bold"
                        >
                            {employee.isFired ? "Fired" : "Fire"}
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default TableView;
