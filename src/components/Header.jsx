import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const Header = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
   
  const handleLogout = async () => {
    try {
        
    localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      toast.success("User Logged Out!")
      navigate("/"); // Redirect to home
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

//   const handleUpdateUser = async (userData) => {
//     try {
//       await updateUser(userData);
//       toast.success("User information updated successfully!");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleUpdatePassword = async (passwordData) => {
//     try {
//       await updateUserPassword(passwordData);
//       toast.success("Password updated successfully!");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>

            {/* <UpdateUserModal
              user={user}
              onUpdateUser={handleUpdateUser}
              onUpdatePassword={handleUpdatePassword}
            /> */}

            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in
            </Link>
            <Link
              to="/register"
              className="link link-hover text-xs sm:text-sm"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
