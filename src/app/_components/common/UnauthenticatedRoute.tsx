import { ReactNode, useState, useMemo, useEffect } from "react";

import AuthManager from "@/_utils/AuthManager";

import ProtectedRoute from "./ProtectedRoute";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const UnauthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  const fallbackUrl = "/";

  const isProtected = () => {
    return AuthManager.silentLogin()
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
