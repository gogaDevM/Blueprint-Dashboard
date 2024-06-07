import { fetchData } from "next-auth/client/_utils";
import { ReactNode, useLayoutEffect, useState } from "react";

interface ProtectedRouteProps {
  fallbackUrl?: string;
  getIsProtected: () => Promise<boolean>;
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const fallbackUrl = props.fallbackUrl ? props.fallbackUrl : "/login";

  console.log("PROPS: PROTECTED ROUTE", props);
  const { getIsProtected, children } = props;

  const [result, setResult] = useState<{
    loading: boolean;
    isProtected: boolean | null;
  }>({
    loading: true,
    isProtected: null,
  });

  useLayoutEffect(() => {
    if (!getIsProtected) {
      setResult({ loading: false, isProtected: false });
      return;
    }

    getIsProtected()
      .then((isProtected) => {
        setResult({ loading: false, isProtected });
      })
      .catch((error) => {
        console.log("Protected Route: Error", error);
        setResult({ loading: false, isProtected: false });
      });
  }, []);

  //   useEffect((prevProps) => {
  //     if (location !== prevProps.location) {
  //       window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  //     }
  //   }

  const renderProtected = () => {
    return <>{children}</>;
  };

  const renderUnprotected = () => {
    window.location.href = fallbackUrl;
    return null;
  };

  const renderLoading = () => {
    return null;
  };

  if (result.loading) {
    return renderLoading();
  } else if (result.isProtected) {
    return renderProtected();
  } else {
    return renderUnprotected();
  }
};

export default ProtectedRoute;
