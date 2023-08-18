import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/authContext";
import NavBar from "../components/UIcomposables/navBar";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <NavBar />
      <Outlet />;
    </>
  );
};
