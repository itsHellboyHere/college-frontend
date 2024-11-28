import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      if (user.is_student) {
        navigate("/dashboard");
      } else if (user.is_faculty) {
        navigate("/dashboard-faculty");
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome to College ERP</h1>
        <p className="text-center text-gray-600 mb-8">
          Streamline your academic and administrative processes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold"
          >
            Student Login
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md font-semibold"
          >
            Faculty Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-semibold"
          >
            Student Registration
          </button>
          <button
            onClick={() => navigate("/register-faculty")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-md font-semibold"
          >
            Faculty Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
