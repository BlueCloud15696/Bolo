import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth-context";

// ----------------------------------------------------------------------

const PrivateElement = ({ element, requiredRoles }) => {
  const { authState } = useContext(AuthContext);
  let location = useLocation();
  if (!authState) return <p className="container">Checking auth..</p>;
  const { status, role, email_verified } = authState;

  return status ? (
    /* email_verified ? ( */
    requiredRoles.includes(role) ? (
      element
    ) : (
      <Navigate to="/" state={{ from: location }} />
    )
  ) : (
    /* ) : (
            <Navigate to="/email_verify" state={{ from: location }} />
        ) */
    <Navigate to="/" state={{ from: location }} />
  );
};

export default PrivateElement;
