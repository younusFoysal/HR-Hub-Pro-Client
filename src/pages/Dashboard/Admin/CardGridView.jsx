import React from 'react';

const CardGridView = ({ employees, handleRoleToggle, handleAdjustSalary, handleFire, loggedInUser }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {employees.map(employee => (
            <div key={employee._id} className="p-4 bg-white border-4 border-green-600 rounded-xl shadow-2xl text-center cursor-pointer w-full">
                <h1 className="text-2xl font-bold uppercase text-green-600">
                    {employee.name}
                </h1>
                <h2 className="text-lg text-gray-700">
                    Designation: {employee.designation}
                </h2>
                <h2 className="text-lg text-gray-700">
                    Salary: ${employee.salary}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                    <button
                        onClick={() => handleRoleToggle(employee.email, employee.role)}
                        disabled={loggedInUser.email === employee.email}
                        className="tracking-wide font-bold rounded border-2 border-green-500 hover:text-white hover:border-lime-600 hover:bg-lime-600 shadow-md py-2 px-2 inline-flex items-center transition duration-500 w-full sm:w-auto"
                    >
                            <span className="mx-auto">
                                {employee.role === "hr" ? "Make Employee" : "Make HR"}
                            </span>
                    </button>
                    <button
                        onClick={() => handleAdjustSalary(employee.email, employee.salary)}
                        disabled={employee.isFired}
                        className="tracking-wide font-bold rounded border-2 border-green-500 hover:text-white hover:border-lime-600 hover:bg-lime-600 shadow-md py-2 px-2 inline-flex items-center transition duration-500 w-full sm:w-auto"
                    >
                            <span className="mx-auto">
                                Salary
                            </span>
                    </button>
                    <button
                        onClick={() => handleFire(employee.email, employee.isFired)}
                        disabled={employee.isFired}
                        className="tracking-wide font-bold rounded border-2 border-red-500 hover:text-white hover:border-red-600 hover:bg-red-600 shadow-md py-2 px-2 inline-flex items-center transition duration-500 w-full sm:w-auto"
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
