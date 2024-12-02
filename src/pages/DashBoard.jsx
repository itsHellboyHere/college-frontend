import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
const DashBoard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [profilePic, setProfilePic] = useState("");

  // Fetch student profile data
  const fetchStudentProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        "https://joyful-determination-production.up.railway.app/api/students/view",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudent(response.data);
      // setProfilePic(
      //   response.data.profile_pic || "https://via.placeholder.com/150"
      // );
    } catch (err) {
      console.error(err);
      setError("Failed to fetch student profile.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfilePic= async() =>{
    try {
      const token=localStorage.getItem("access_token");
      const response= await axios.get(
        "https://joyful-determination-production.up.railway.app/api/students/profile-pic/",
        {
          headers:{
            Authorization:`Bearer ${token}`
            },
        }
        
      )
      setProfilePic(response.data.profile_pic_url || "https://via.placeholder.com/150")
      console.log(response.data.profile_pic_url);
      
    } catch (error) {
      console.log(error);
      setError("Failed to load profile pic");
      
    }
  }

  useEffect(() => {
    fetchStudentProfile();
    fetchProfilePic();
  }, []);


  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_pic", file);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.put(
        "https://joyful-determination-production.up.railway.app/api/students/profile-pic/update/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedProfilePic = response.data.data.profile_pic_url;
      setProfilePic(updatedProfilePic);

      setStudent((prevStudent) => ({
        ...prevStudent,
        profile_pic: updatedProfilePic,
      }));

      toast.success(response.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile picture.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
      
      <nav className="bg-blue-500 p-4 text-white flex justify-between">
        <h1 className="text-2xl font-bold"> Dashboard</h1>
        <Link to="/update-student" className="bg-white text-blue-500 px-4 py-2 rounded">
          Update Student
        </Link>
      </nav>
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      <div className="flex items-center mt-4">
        {/* Profile Picture Section */}
        <div className="relative w-32 h-32">
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border border-gray-300"
          />
          <label
            htmlFor="uploadProfilePic"
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0 3c-3 0-5 2-5 2s2 2 5 2 5-2 5-2-2-2-5-2z"
              />
            </svg>
          </label>
          <input
            id="uploadProfilePic"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        </div>
        {/* Student Info Section */}
        <div className="ml-4 space-y-2">
          {student && (
            <>
              <p>
                <strong>Name:</strong> {student.first_name} {student.last_name}
              </p>
              <p>
                <strong>Date of Birth:</strong> {student.date_of_birth}
              </p>
              <p>
                <strong>Gender:</strong> {student.gender}
              </p>
              <p>
                <strong>Blood Group:</strong> {student.blood_group}
              </p>
              <p>
                <strong>Contact Number:</strong> {student.contact_number}
              </p>
              <p>
                <strong>Address:</strong> {student.address}
              </p>
                <p>
                <strong>Subjects:</strong>{" "}
                {student.subjects.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {student.subjects.map((subject) => (
                      <li key={subject.id}>
                        <strong>{subject.name}:</strong> {subject.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No subjects assigned yet."
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
