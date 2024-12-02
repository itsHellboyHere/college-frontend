import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  console.log("ProtectedRoute is rendering");

  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("access_token");

 
  if (!accessToken || !user) {
  console.log("No access token or user found, redirecting to login.");
  return <Navigate to="/login" />;
}

if (role && !user[role]) {

  return <Navigate to="/unauthorized" />;
}

  

  console.log("Rendering protected route: children");
  return children;
};


export default ProtectedRoute;
