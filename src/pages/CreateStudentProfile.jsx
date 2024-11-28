import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
const CreateStudentProfile = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    blood_group: "",
    contact_number: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post("https://joyful-determination-production.up.railway.app/api/students/create-profile/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      
      toast.success("Profile created successfully!");
    navigate("/dashboard");
      console.log(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to create profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Create Profile</h4>

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
            <option value="" disabled>
              Select gender
            </option>
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

export default CreateStudentProfile;
