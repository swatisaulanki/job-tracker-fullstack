import React, { useState } from "react";
import axios from "axios";
import './JobForm.css';

function JobForm({ refresh }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    link: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("https://job-tracker-fullstack.onrender.com/jobs/create", form);
      setForm({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: "",
        link: "",
      });
      refresh();
    } catch (err) {
      console.error("Error submitting job application:", err.response || err);
      setError("Error submitting the job application. Please try again.");
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-md">
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">Add Job Application</h1>

          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            required
            className="border p-2 w-full rounded"
          />
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            required
            className="border p-2 w-full rounded"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <input
            name="appliedDate"
            type="date"
            value={form.appliedDate}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Job Link"
            className="border p-2 w-full rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
