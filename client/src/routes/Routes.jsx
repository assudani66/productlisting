import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { ProtectedRoute } from "./ProtectedRoutes";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Auth from "../pages/Auth";

const AppRoutes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [{ path: "/auth", element: <Auth /> }];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
