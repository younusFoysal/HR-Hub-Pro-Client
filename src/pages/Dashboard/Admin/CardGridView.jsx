import React from 'react';
import './CardGridView.css';

const CardGridView = ({ employees, handleRoleToggle, handleAdjustSalary, handleFire, loggedInUser }) => (
    <div className="card-grid">
        {employees.map(employee => (
            <div key={employee._id} className="card">
                <h1 className="text-2xl font-bold uppercase text-indigo-600 transition duration-500">
                    {employee.name}
                </h1>
                <h2 className="text-lg text-gray-700 transition duration-500">
                    Designation: {employee.designation}
                </h2>
                <h2 className="text-lg text-gray-700 transition duration-500">
                    Salary: ${employee.salary}
                </h2>
                <div className="grid grid-cols-3 gap-2 w-full mt-2">
                    <button
                        onClick={() => handleRoleToggle(employee.email, employee.role)}
                        disabled={loggedInUser.email === employee.email}
                        className="  font-medium rounded border-2 border-indigo-500 hover:text-white hover:border-blue-600 hover:bg-blue-600 shadow-md py-1 px-1 inline-flex items-center transition duration-500"
                    >
            <span className="mx-auto">
              {employee.role === "hr" ? "Make Employee" : "Make HR"}
            </span>
                    </button>
                    <button
                        onClick={() => handleAdjustSalary(employee.email, employee.salary)}
                        disabled={employee.isFired}
                        className="  font-medium rounded border-2 border-indigo-500 hover:text-white hover:border-blue-500 hover:bg-blue-500 shadow-md py-1 px-1 inline-flex items-center transition duration-500"
                    >
            <span className="mx-auto">
              Salary
            </span>
                    </button>
                    <button
                        onClick={() => handleFire(employee.email, employee.isFired)}
                        disabled={employee.isFired}
                        className="  font-medium rounded border-2 border-indigo-500 hover:text-white hover:border-red-600 hover:bg-red-600 shadow-md py-1 px-1 inline-flex items-center transition duration-500"
                    >
            <span className="mx-auto">
              {employee.isFired ? "Fired" : "Fire"}
            </span>
                    </button>
                </div>
            </div>
        ))}
    </div>
);

export default CardGridView;
