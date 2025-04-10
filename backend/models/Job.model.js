const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Interview", "Rejected", "Accepted"],
    default: "Pending",
  },
  appliedDate: {
    type: Date,
    default: Date.now, // Sets today's date by default
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
});

const JobModel = mongoose.model("Job", jobSchema);

module.exports = {
  JobModel,
};
