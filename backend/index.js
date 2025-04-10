const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connection } = require("./config/db"); 
const { jobRouter } = require("./routes/Job.routes"); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/jobs", jobRouter);

// Root route
app.get("/", (req, res) => {
    res.send("Job Tracker Backend is running ");
});

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connected to the database successfully")
        console.log(`Server is running on port ${process.env.PORT}`)
    } catch (err) {
        console.log("Error while connecting to DB")
        console.log(err)
    }
});
