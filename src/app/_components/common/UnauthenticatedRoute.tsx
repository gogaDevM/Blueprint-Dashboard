import { ReactNode, useState, useMemo, useEffect } from "react";

import Auth from "@/_utils/Auth";
import AuthTokens from "@/_utils/AuthTokens";

import ProtectedRoute from "./ProtectedRoute";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const UnauthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  const fallbackUrl = "/";

  const isProtected = () => {
    return Auth.silentLogin()
      .then((user) => {
        return false;
      })
      .catch((error) => {
        return true;
      });
  };

  return (
    <ProtectedRoute getIsProtected={isProtected} fallbackUrl={fallbackUrl}>
      {children}
    </ProtectedRoute>
  );
};

export default UnauthenticatedRoute;
