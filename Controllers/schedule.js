const scheduleWorker = require("../Models/workerSchedule");
const BookedWorker = require("../Models/bookedWorker");
const express = require("express");
const router = express.Router();

router.post("/createWorkerSchedule", async (req, res) => {
  try {
    const { day, from, to, workerId } = req.body;
    const worker = await scheduleWorker.findOne({ day, workerId });
    const workerSchedule = await scheduleWorker.find({
      from,to})
    if (workerSchedule.length > 10000 * 60 * 60 * 30) {
      res.status(201).json({ success: true, message: "Available" });
    } else {
      return res.status(401).json({ success: false, message: "Not Available" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
