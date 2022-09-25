import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth = (props: RequireAuthProps) => {
  const { auth } = useAuth();
  const { allowedRoles } = props;
  const location = useLocation();
  const role = auth.user.role;

  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
