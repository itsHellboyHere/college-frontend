import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DashboardFaculty = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("https://joyful-determination-production.up.railway.app/api/faculty/view-student", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
    
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
  <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
  <div>
    <Link to="/create-student" className="bg-white text-blue-500 px-4 py-2 rounded mr-4">
      Create Student
    </Link>
    <Link to="/create-subject" className="bg-white text-blue-500 px-4 py-2 rounded">
      Create Subject
    </Link>
  </div>
</nav>

      {/* Students List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Student List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-4 border">Name</th>
                <th className="text-left py-2 px-4 border">Date of Birth</th>
                <th className="text-left py-2 px-4 border">Gender</th>
                <th className="text-left py-2 px-4 border">Subjects</th>
                <th className="text-left py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="py-2 px-4 border">{student.date_of_birth}</td>
                  <td className="py-2 px-4 border">{student.gender}</td>
                  <td className="py-2 px-4 border">
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
                      "No subjects assigned"
                    )}
                  </td>
                  <td className="py-2 px-4 border">
                    <Link
                      to={`/student/${student.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardFaculty;
