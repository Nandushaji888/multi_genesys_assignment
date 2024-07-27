import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddEditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  });
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCountries();
    if (id) fetchEmployeeDetails();
  }, [id]);

  const fetchCountries = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/countries");
      setCountries(response.data);
    } catch (error) {
      setError('Error fetching countries');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      setError('Error fetching employee details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (id) {
        const response = await axios.put(`/api/employees/${id}`, employee);
        if (response.status === 200) {
          navigate("/");
        } else {
          setError("Failed to update employee. Please try again.");
        }
      } else {
        const response = await axios.post("/api/employees", employee);
        if (response.status === 201) {
          navigate("/");
        } else {
          setError("Failed to add employee. Please try again.");
        }
      }
    } catch (error) {
      if (error.response) {
        setError(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">
        {id ? "Edit Employee" : "Add Employee"}
      </h1>
      {loading ? (
        <div className="text-center text-blue-700">Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4"
        >
          {error && <div className="text-red-500 text-center">{error}</div>}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={employee.name}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={employee.mobile}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
          <select
            name="country"
            value={employee.country}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={employee.state}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={employee.district}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full"
          >
            {id ? "Update" : "Add"}
          </button>
          
        </form>
      )}
    </div>
  );
};

export default AddEditEmployee;
