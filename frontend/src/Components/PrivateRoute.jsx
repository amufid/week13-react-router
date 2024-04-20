import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import PropTypes from 'prop-types';
function PrivateRoute({ children }) {

   const auth = useAuth();

   if (!auth.token) {
      return <Navigate to='/login'/>
   }
   return children;
}

// Validasi prop types
PrivateRoute.propTypes = {
   children: PropTypes.node.isRequired,
};

export default PrivateRoute;
