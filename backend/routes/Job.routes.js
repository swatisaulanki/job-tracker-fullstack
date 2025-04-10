const express = require("express");
const { JobModel } = require("../models/Job.model");

const jobRouter = express.Router();

// GET all jobs
jobRouter.get("/", async (req, res) => {
  try {
    const jobs = await JobModel.find();
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching jobs" });
  }
});

// POST create a job
jobRouter.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    const newJob = new JobModel(payload);
    await newJob.save();
    res.status(201).json({ msg: "Created the job application", job: newJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong while creating job" });
  }
});

// PATCH update job status
jobRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const updatedJob = await JobModel.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ msg: "Job not found" });
    }
    res.status(200).json({ msg: "Updated the job status", job: updatedJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to update job" });
  }
});

// DELETE a job
jobRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await JobModel.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ msg: "Job not found" });
    }
    res.status(200).json({ msg: "Deleted the job", job: deletedJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to delete job" });
  }
});

module.exports = {
  jobRouter,
};
