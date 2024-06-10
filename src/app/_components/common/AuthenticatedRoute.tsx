import { ReactNode, useMemo } from "react";

import AuthManager from "@/_utils/AuthManager";

import ProtectedRoute from "./ProtectedRoute";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  const isProtected = async () => {
    return AuthManager.silentLogin()
      .then((user) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  };

  return (
    <ProtectedRoute getIsProtected={isProtected}>{children}</ProtectedRoute>
  );
};

export default AuthenticatedRoute;
