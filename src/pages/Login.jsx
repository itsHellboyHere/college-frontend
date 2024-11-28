import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import toast from "react-hot-toast"
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    
    if (!password  || !username) {
    //   setError("Passwords do not match.");
    toast.error("Please provide all details.")
      setLoading(false);
      return;
    }

    try {
      
      const response= await axios.post("https://joyful-determination-production.up.railway.app/api/auth/login/",
        {
            "username": username,
            "password":password,
            
        }
      )
      // console.log(response);
      
const { access, refresh, username: user, is_student, is_faculty ,profile_completed} = response.data;

  // Save to localStorage
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
  localStorage.setItem(
    "user",
    JSON.stringify({ username: user, is_student, is_faculty ,profile_completed})
  );
 

  
      toast.success("Login successful!")
      setSuccess("Login successful!");

      if (is_faculty) {
      navigate("/dashboard-faculty");
    }

    if (is_student) {
      if (!profile_completed) {
        navigate("/create-student-profile"); 
      } else {
        navigate("/dashboard"); 
      }
    }
      

    } catch (err) {
     
        toast.error(err.response.data.detail)
      
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
          <h4 className="text-center text-3xl font-bold">Login</h4>

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
          {/* <p className="text-center">
            a member?{" "}
            <Link
              to="/login"
              className="ml-2 link link-hover link-primary capitalize"
            >
              login
            </Link>
          </p> */}
           <Link to ='/' className="ml-2 text-center link link-hover link-primary capitalize">Back to Home</Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
