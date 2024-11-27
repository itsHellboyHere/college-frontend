import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Form validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Simulate form submission (e.g., send data to API)
      const response= await axios.post("http://localhost:8001/api/auth/register/",
        {
            "username": username,
            "password":password,
            "c_password":confirmPassword,
        }
      )
      console.log(response);
      
      toast.success(response.data.message)
      setSuccess("Registration successful!");
    navigate("/login");
    } catch (err) {
     if (err.response?.data?.username) {
      setError(err.response.data.username[0]);
      toast.error(err.response.data.username[0]);
    } 
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form
          onSubmit={handleSubmit}
          className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        >
          <h4 className="text-center text-3xl font-bold">Register</h4>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          {/* Username */}
          <div className="form-control">
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              id="username"
              className="input input-bordered"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

        

          {/* Password */}
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              className="input input-bordered"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label htmlFor="confirmPassword" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="input input-bordered"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center">
            Already a member?{" "}
            <Link
              to="/login"
              className="ml-2 link link-hover link-primary capitalize"
            >
              login
            </Link>
          </p>
           {/* Login Link */}
          <p className="text-center">
            Register as faculty?{" "}
            <Link
              to="/register-faculty"
              className="ml-2 link link-hover link-primary capitalize"
            >
              Sign-Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
