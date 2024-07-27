import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const employee = {
//     name: "Nandu",
//     email: "nandu@gmail",
//     id: 123,
//     mobile: 9874562135,
//     state: "kerla",
//     country: "India",
//     district: "Ernakulam",
//   };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`/api/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

//   const handleDelete = async (id) => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.delete(`/api/employees/${id}`);
//       if (response.status === 200) {
//         navigate("/");
//       } else {
//         setError("Failed to delete employee.");
//       }
//     } catch (error) {
//       setError("An error occurred while deleting the employee.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  if (!employee) return <div className="text-center mt-10">Employee not found.</div>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Employee Details</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{employee.name}</h2>
        <div className="mb-6 items-center text-balance">
          <p className="text-gray-600"><strong>Employee ID:</strong> {employee.id}</p>
          <p className="text-gray-600"><strong>Email:</strong> {employee.email}</p>
          <p className="text-gray-600"><strong>Mobile:</strong> {employee.mobile}</p>
          <p className="text-gray-600"><strong>District:</strong> {employee.district}</p>
          <p className="text-gray-600"><strong>Country:</strong> {employee.country}</p>
          <p className="text-gray-600"><strong>State:</strong> {employee.state}</p>
        </div>
        <Link
          to={`/employee/edit/${employee.id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md my-1 py-2 px-2 mr-3"
        >
          Edit
        </Link>
        {/* <button
          onClick={() => handleDelete(employee.id)}
          className="bg-red-800 hover:bg-red-600 text-white font-bold rounded-md my-1 py-2 px-2"
        >
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default EmployeeDetails;
