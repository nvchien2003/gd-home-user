import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../component/layout/MainLayout";
import SignIn from "../page/auth/sign-in";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>
    },
    {
        path: '/sign-in',
        element: <SignIn />
    }
]);

const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
