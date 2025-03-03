const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: false },
  videoUrl: { type: String, required: true },
});

const CourseSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  lectures: [LectureSchema], // Array of lectures
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
