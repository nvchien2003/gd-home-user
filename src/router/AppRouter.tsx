import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../component/layout/MainLayout";
import SignIn from "../page/auth/sign-in";
import Register from "../page/auth/register";
import ForgotPassword from "../page/auth/forgot";
import VerifyOtp from "../page/auth/verify-otp";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />
    },
    {
        path: '/sign-in',
        element: <SignIn />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '/verify-otp',
        element: <VerifyOtp />
    }
]);

const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
