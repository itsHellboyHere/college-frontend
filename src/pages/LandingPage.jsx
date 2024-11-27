import { useEffect } from "react";
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
    <div className="flex ">

    </div>
  )
}
export default LandingPage