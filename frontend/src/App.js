import React, { useEffect, useState } from "react";
import axios from "axios";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("https://job-tracker-fullstack.onrender.com/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title"> Student Job Tracker</h1>
      <div className="form-wrapper">
        <JobForm refresh={fetchJobs} />
      </div>
      <div className="list-wrapper">
        <JobList jobs={jobs} refresh={fetchJobs} />
      </div>
    </div>
  );
}

export default App;
