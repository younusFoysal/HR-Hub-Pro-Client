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
                path: 'work-sheet',
                element: <WorkSheet></WorkSheet>
            },

            {
                path: "employee-list",
                element: <EmployeeList></EmployeeList>
            }

        ],
    },
])

