import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateStudentProfile = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    blood_group: "",
    contact_number: "",
    address: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch the existing student data (on page load)
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:8001/api/students/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch student data.");
      }
    };

    fetchStudentData();
  }, []);

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle profile picture upload
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // Update student details
  const updateStudentDetails = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.put("http://localhost:8001/api/students/update/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Student details updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update student details.");
    }
  };

  // Upload profile picture
  const uploadProfilePicture = async () => {
    if (!profilePicture) {
      toast.error("Please select a profile picture.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", profilePicture);

    try {
      const token = localStorage.getItem("access_token");
      await axios.post("http://localhost:8001/api/students/upload-profile-picture/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload profile picture.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateStudentDetails();
    uploadProfilePicture();
    setLoading(false);
  };

  return (
    <section className="h-screen grid place-items-center">
      <form onSubmit={handleSubmit} className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Update Profile</h4>

        {/* First Name */}
        <div className="form-control">
          <label className="label">First Name</label>
          <input
            type="text"
            name="first_name"
            className="input input-bordered"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div className="form-control">
          <label className="label">Last Name</label>
          <input
            type="text"
            name="last_name"
            className="input input-bordered"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="form-control">
          <label className="label">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            className="input input-bordered"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="form-control">
          <label className="label">Gender</label>
          <select
            name="gender"
            className="select select-bordered"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>

        {/* Blood Group */}
        <div className="form-control">
          <label className="label">Blood Group</label>
          <input
            type="text"
            name="blood_group"
            className="input input-bordered"
            value={formData.blood_group}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact Number */}
        <div className="form-control">
          <label className="label">Contact Number</label>
          <input
            type="tel"
            name="contact_number"
            className="input input-bordered"
            value={formData.contact_number}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="form-control">
          <label className="label">Address</label>
          <textarea
            name="address"
            className="textarea textarea-bordered"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Profile Picture Upload */}
        <div className="form-control">
          <label className="label">Profile Picture</label>
          <input
            type="file"
            name="profile_picture"
            className="input input-bordered"
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default UpdateStudentProfile;
