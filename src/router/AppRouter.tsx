import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../component/layout/MainLayout";
import SignIn from "../page/auth/sign-in";

import ForgotPassword from "../page/auth/forgot";
import VerifyOtp from "../page/auth/verify-otp";
import SignUp from "../page/auth/sign-up";
import Home from "../page/home";
import ExplorePage from "../page/explore";
import PropertyDetailPage from "../page/explore/property";
import BookingPage from "../page/booking";
import ChatPage from "../page/chat";
import ProfilePage from "../page/profile";
import HistoryPage from "../page/history";
import { Favorites } from "../page/favorites";
import { Rentals } from "../page/history/rental";
import DashboardOverview from "../page/history/overview";
import ResetPassword from "../page/auth/reset-pass";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/explore',
                element: <ExplorePage />
            },
            {
                path: '/property/:id',
                element: <PropertyDetailPage />
            },
            {
                path: '/booking',
                element: <BookingPage />
            },
            {
                path: '/chat',
                element: <ChatPage />
            },
            {
                path: '/profile',
                element: <ProfilePage />
            },
            {
                path: '/history',
                element: <HistoryPage />,
                children: [
                    {
                        index: true,
                        element: <DashboardOverview />
                    }
                ]
            },
            {
                path: '/favorites',
                element: <Favorites />
            },
            {
                path: '/rentals',
                element: <Rentals />
            }
        ]
    },
    {
        path: '/sign-in',
        element: <SignIn />
    },
    {
        path: '/sign-up',
        element: <SignUp />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '/verify-otp',
        element: <VerifyOtp />
    },
    {
        path: '/reset-password',
        element: <ResetPassword />
    }
]);

const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
