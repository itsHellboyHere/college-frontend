import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import toast from "react-hot-toast";

const CreateSubject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "https://joyful-determination-production.up.railway.app/api/subjects/create-subject/",
        { name: subjectName, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast("Subject Added!")
      navigate("/dashboard-faculty"); 
    } catch (err) {
      setLoading(false);
      setError("Failed to create subject.");
    }
  };

  return (
    <div className="p-8">
      <nav className="bg-blue-500 p-4 text-white flex justify-around">
        <h1 className="text-2xl font-bold">Create Subject</h1>
        <Link to="/dashboard-faculty">
        <button className=" text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-
        2 px-4 rounded">Home</button>
        </Link>
        
      </nav>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="subjectName" className="block text-lg">
            Subject Name
          </label>
          <input
            id="subjectName"
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Subject"}
        </button>
      </form>
    </div>
  );
};

export default CreateSubject;
