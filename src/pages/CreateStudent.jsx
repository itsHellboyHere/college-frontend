import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CreateStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    gender: "M",
    blood_group: "O+",
    contact_number: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("access_token");
      await axios.post("https://joyful-determination-production.up.railway.app/api/faculty/create-student/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Student created successfully!");
      toast.success("Student created successfully!")
      setTimeout(() => {
        navigate("/dashboard-faculty");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to create student. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
        <Link to ='/dashboard-faculty' className="ml-2 text-center link link-hover link-primary capitalize">Back to Home</Link>
      <h1 className="text-2xl font-bold mb-6">Create Student</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Blood Group</label>
          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact Number</label>
          <input
            type="tel"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            pattern="^\+?\d{10,15}$"
            placeholder="+1234567890"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            rows="3"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Create Student
        </button>
      </form>
    </div>
  );
};

export default CreateStudent;
