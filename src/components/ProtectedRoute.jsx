import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("access_token");


  if (!accessToken || !user) {
    return <Navigate to="/login" />;
  }


   if (role && !user[role]) {
    return <Navigate to="/unauthorized" />;
  }

  
  if (user.is_student) {
    if (!user.profile_completed) {
      return <Navigate to="/create-student-profile" />;
    }
  }
  return children;
};

export default ProtectedRoute;
