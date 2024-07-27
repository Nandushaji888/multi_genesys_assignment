import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirmation";

const HomePage = () => {
//   const employee = [
//     { id: 123, name: "Nandu",email:'nandu@gmail' },
//     { id: 124, name: "Arun" },
//     { id: 125, name: "Rig" },
//     { id: 126, name: "Anvidh" },
//   ];
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const employeesPerPage = 3;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/employees");
      if (response.status === 200) {
        setEmployees(response.data);
      } else {
        setError("Failed to fetch employees.");
      }
    } catch (error) {
      setError("An error occurred while fetching employees.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/employees/${searchId}`);
      if (response.status === 200) {
        setEmployees([response.data]);
      } else {
        setError("Employee not found.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Employee not found.");
      } else {
        setError("An error occurred while fetching the employee.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.delete(`/api/employees/${selectedEmployeeId}`);
      if (response.status === 200) {
        fetchEmployees();
        setShowDeleteModal(false); 
      } else {
        setError("Failed to delete employee.");
      }
    } catch (error) {
      setError("An error occurred while deleting the employee.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedEmployeeId(id);
    setShowDeleteModal(true);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex flex-col items-center justify-center text-3xl font-bold mt-4">
        Employee Management
      </h1>
      <div className=" m-16 p-4 pt-16 rounded-lg bg-slate-200">
        <div className=" mx-28 my-4 flex justify-between">
          <div>
            <input
              type="text"
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="border rounded-md my-1 py-1 px-2 mr-2"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white rounded-md my-1 py-1 px-2"
            >
              Search
            </button>
          </div>
          <Link
            to="/add"
            className="bg-green-700 text-white rounded-md my-1 py-1 px-2"
          >
            Add New Employee
          </Link>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-10 ">
            <table className="w-4/5 bg-white border-collapse border border-gray-200 ">
              <thead >
                <tr >
                  <th className="py-2 px-4 border-b border-gray-200">ID</th>
                  <th className="py-2 px-4 border-b border-gray-200">Name</th>
                  <th className="py-2 px-4 border-b border-gray-200">Email</th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                      {employee.id}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center font-semibold">
                      {employee.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center font-semibold">
                      {employee.email}
                    </td>
    
                    <td className="py-2 px-2 border-b border-gray-200">
                      <div className="flex justify-center gap-2">
                         <Link
                          to={`/employee/${employee.id}`}
                          className="bg-black text-white rounded-md my-1 py-1 pb-2 px-2"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/edit/${employee.id}`}
                          className="bg-teal-800 text-white rounded-md my-1 py-1 px-2"
                        >
                          Edit
                        </Link>
                        <button
                        onClick={() => handleDeleteClick(employee.id)}
                        className="bg-red-500 text-white rounded-md my-1 py-1 px-2"
                      >
                        Delete
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white rounded-md my-1 py-1 px-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="p-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white rounded-md my-1 py-1 px-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <DeleteConfirmation
            onDelete={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
