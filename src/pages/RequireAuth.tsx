import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth = (props: RequireAuthProps) => {
  const { allowedRoles } = props;
  const { auth } = useAuth();

  const location = useLocation();

  const role = auth.user?.role;

  return allowedRoles?.includes(role) ? (
    <Outlet />
  ) : auth?.tokens.access ? ( //changed from user to accessToken to persist login after refresh
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
