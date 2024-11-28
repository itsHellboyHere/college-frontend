import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState([]); // Store available subjects
  const [selectedSubject, setSelectedSubject] = useState(""); // Selected subject for assignment
  const [assigning, setAssigning] = useState(false); // Loading state for assigning subject

  useEffect(() => {
    // Fetch student details
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          `https://joyful-determination-production.up.railway.app/api/faculty/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudent(response.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 404) {
          setError("Student not found.");
        } else {
          setError("Failed to fetch student details.");
        }
      } finally {
        setLoading(false);
      }
    };


    const fetchSubjects = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          "https://joyful-determination-production.up.railway.app/api/subjects/all/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubjects(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch subjects.");
      }
    };

    fetchStudent();
    fetchSubjects();
  }, [id]);


  const handleAssignSubject = async (e) => {
    e.preventDefault();
    if (!selectedSubject) {
      setError("Please select a subject to assign.");
      return;
    }
    setAssigning(true);
    setError("");

    const token = localStorage.getItem("access_token");

    try {
      await axios.post(
        `https://joyful-determination-production.up.railway.app/api/subjects/assign-subject/${id}/`,
        { subject_id: selectedSubject },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Subject assigned successfully!");
      setAssigning(false);
      setSelectedSubject(""); 
    } catch (err) {
      console.error(err);
      setAssigning(false);
      setError("Failed to assign subject.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div className="p-8">
        <Link to="/dashboard-faculty" className="ml-2 text-center link link-hover link-primary capitalize">
          Back to Home
        </Link>
        <p className="text-red-500">{error}</p>
        {error === "Student not found." && (
          <p className="text-gray-700">
            The student with ID <strong>{id}</strong> could not be located. Please verify the ID or contact the administrator for support.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link to="/dashboard-faculty" className="ml-2 text-center link link-hover link-primary capitalize">
        Back to Home
      </Link>
      <h1 className="text-2xl font-bold mb-4">
        Student Details: {student.first_name} {student.last_name}
      </h1>
      <div className="bg-white p-6 rounded shadow-md">
        <p><strong>Date of Birth:</strong> {student.date_of_birth}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Blood Group:</strong> {student.blood_group}</p>
        <p><strong>Contact Number:</strong> {student.contact_number}</p>
        <p><strong>Address:</strong> {student.address}</p>
        <div className="mt-4">
          <strong>Subjects:</strong>
          {student.subjects.length > 0 ? (
            <ul className="list-disc pl-4">
              {student.subjects.map((subject) => (
                <li key={subject.id}>
                  {subject.name}{" "}
                  {subject.faculty && (
                    <span className="text-sm text-gray-500">
                      (Faculty: {subject.faculty.username})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No subjects assigned</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Assign Subject</h2>
        <form onSubmit={handleAssignSubject}>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Select Subject
            </label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={assigning}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {assigning ? "Assigning..." : "Assign Subject"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewStudent;
