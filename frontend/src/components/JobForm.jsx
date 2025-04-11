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
    <div className="form-wrapper">
      <div className="form-container">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="job-form">
          <h1 className="form-title">Add Job Application</h1>

          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            required
            className="form-input"
          />
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            required
            className="form-input"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="form-input"
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
            className="form-input"
          />
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Job Link"
            className="form-input"
          />
          <button type="submit" className="form-button">
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
