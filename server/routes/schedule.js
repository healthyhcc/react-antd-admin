const express = require("express");
const router = express.Router();
const schedule = require('node-schedule');

router.post("/addTask", (request, response) => {
    const job = schedule.scheduleJob()
});

module.exports = router;
