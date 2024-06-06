import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import ErrorPage from "../pages/ErrorPage.jsx";
import Home from "../pages/Home.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Login from "../pages/Login.jsx";
import SignUp from "../pages/SignUp.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Statistics from "../pages/Dashboard/Common/Statistics.jsx";
import WorkSheet from "../pages/Dashboard/Employee/WorkSheet.jsx";
import EmployeeList from "../pages/Dashboard/Hr/EmployeeList.jsx";
import ProfileDetails from "../pages/Dashboard/Hr/ProfileDetails.jsx";
import WorkRecords from "../pages/Dashboard/Hr/WorkRecords.jsx";
import PaymentHistory from "../pages/Dashboard/Employee/PaymentHistory.jsx";
import AdminEmployeeList from "../pages/Dashboard/Admin/AdminEmployeeList.jsx";
import Profile from "../pages/Dashboard/Common/Profile.jsx";
import ContactUs from "../components/Home/ContactUS.jsx";
import Messages from "../pages/Dashboard/Admin/Messages.jsx";
import HrRoute from "./HrRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/contact-us',
                element: <ContactUs />
            }

        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <PrivateRoute>
                        <Statistics />
                    </PrivateRoute>
                ),
            },
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            // Employee Routes
            {
                path: 'work-sheet',
                element: <PrivateRoute><WorkSheet></WorkSheet></PrivateRoute>
            },
            {
                path: 'payment-history',
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            },
            // HR Routes
            {
                path: "employee-list",
                element: <HrRoute><EmployeeList></EmployeeList></HrRoute>
            },
            {
                path: 'details/:email',
                element: <HrRoute><ProfileDetails></ProfileDetails></HrRoute>,
                loader: ({params}) => fetch(`https://hr-hub-server.vercel.app/user/${params.email}`)
            },
            {
                path: "progress",
                element: <HrRoute><WorkRecords></WorkRecords></HrRoute>
            },
            // Admin Routes
            {
                path: 'all-employee-list',
                element: <AdminRoute><AdminEmployeeList></AdminEmployeeList></AdminRoute>
            },
            {
                path: 'all-messages',
                element: <AdminRoute><Messages></Messages></AdminRoute>
            }

        ],
    },
])

