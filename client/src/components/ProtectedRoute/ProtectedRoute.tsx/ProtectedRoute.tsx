import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  isLoggedIn: boolean;
  children: ReactNode;
};

function ProtectedRoute({
  isLoggedIn,
  children,
}: ProtectedRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;