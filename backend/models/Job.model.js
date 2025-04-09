const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: String,
  appliedDate: String,
  link: String,
});

const JobModel = mongoose.model("Job", jobSchema);

module.exports = {
  JobModel,
};
