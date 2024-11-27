import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchStudent();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div className="p-8">
          <Link to ='/dashboard-faculty' className="ml-2 text-center link link-hover link-primary capitalize">Back to Home</Link>
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
       <Link to ='/dashboard-faculty' className="ml-2 text-center link link-hover link-primary capitalize">Back to Home</Link>
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
    </div>
  );
};

export default ViewStudent;
