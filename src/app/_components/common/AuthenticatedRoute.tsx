import { ReactNode, useMemo } from "react";

import Auth from "@/_utils/Auth";
import AuthTokens from "@/_utils/AuthTokens";

import ProtectedRoute from "./ProtectedRoute";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

console.log("REFRESH TOKEN IN AUTH ROUTE", AuthTokens.getRefreshToken());

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  const isProtected = async () => {
    return Auth.silentLogin()
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
