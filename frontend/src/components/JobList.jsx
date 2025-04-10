import React from "react";
import axios from "axios";
import './JobList.css';

function JobList({ jobs, refresh }) {
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`https://job-tracker-fullstack.onrender.com/jobs/update/${id}`, { status });
      refresh();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`https://job-tracker-fullstack.onrender.com/jobs/delete/${id}`);
      refresh();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="job-list">
      <div className="job-list-header">
        <div>Company</div>
        <div>Role</div>
        <div>Status</div>
        <div>Date / Link</div>
      </div>

      {jobs.map((job) => (
        <div key={job._id} className="job-card">
          <div>{job.company}</div>
          <div>{job.role}</div>
          <div>
            <select
              value={job.status}
              onChange={(e) => updateStatus(job._id, e.target.value)}
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          <div>
            <div>{job.appliedDate}</div>
            {job.link && (
              <a href={job.link} target="_blank" rel="noreferrer">
                View Job
              </a>
            )}
            <br />
            <button onClick={() => deleteJob(job._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobList;
