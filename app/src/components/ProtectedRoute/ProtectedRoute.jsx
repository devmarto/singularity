import { Navigate } from 'react-router';

const ProtectedRoute = ({ children, user }) => {
  if (!user.id) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;