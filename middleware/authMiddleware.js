import { useRouter } from "next/router";
import { useEffect } from "react";

const routeAuth = (WrappedComponent) => {
  const Authenticate = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.back();
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Authenticate;
};

export default routeAuth;
