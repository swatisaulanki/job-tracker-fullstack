const express = require("express");
const { JobModel } = require("../models/Job.model");

const jobRouter = express.Router();

// GET all jobs
jobRouter.get("/", async (req, res) => {
  try {
    const jobs = await JobModel.find().sort({ appliedDate: -1 });
    res.send(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Failed to get jobs" });
  }
});

// POST create a job
jobRouter.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    const newJob = new JobModel(payload);
    await newJob.save();
    res.send("Created the job application");
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Something went wrong while creating job" });
  }
});

// PATCH update job status
jobRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    await JobModel.findByIdAndUpdate(id, payload);
    res.send("Updated the job status");
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Failed to update job" });
  }
});

// DELETE a job
jobRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await JobModel.findByIdAndDelete(id);
    res.send("Deleted the job");
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Failed to delete job" });
  }
});

module.exports = {
  jobRouter,
};
