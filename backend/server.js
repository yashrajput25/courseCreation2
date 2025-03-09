require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Fix: Allow cross-origin requests
const Course = require('./models/Course');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // ✅ Fix: Add CORS middleware

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

function extractVideoId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

// ✅ Fix: Fetch both Title and Description
async function getVideoDetails(videoId) {
  try {
    const response = await youtube.videos.list({
      part: 'snippet',
      id: videoId,
    });

    if (response.data.items && response.data.items.length > 0) {
      return {
        title: response.data.items[0].snippet.title, // ✅ Return video title
        description: response.data.items[0].snippet.description, // ✅ Return video description
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('❌ Error fetching video details:', error);
    return null;
  }
}

function extractTimestampsAndTitlesWithEndTimes(description) {
  if (!description) return [];

  const timestampRegex = /(\d{1,2}:?\d{2}:?\d{2}|\d{1,2}[hm]\s?\d{2}[ms]\s?\d{2}[ms]|\d{1,2}:\d{2})\s*(?:-|–|:|—)?\s*(.+)?/g;
  const matches = [];
  let match;

  while ((match = timestampRegex.exec(description)) !== null) {
    matches.push({
      timestamp: match[1],
      title: match[2] ? match[2].trim() : '',
    });
  }

  const result = [];
  for (let i = 0; i < matches.length; i++) {
    const chapter = matches[i];
    const nextChapter = matches[i + 1];

    result.push({
      startTime: chapter.timestamp,
      endTime: nextChapter ? nextChapter.timestamp : null, // If there's a next chapter, use its start time as the end time.
      title: chapter.title,
    });
  }

  return result;
}

// ✅ Fix: Ensure `title` is correctly assigned
app.post('/timestamps', async (req, res) => {
  console.log("Incoming request body:", req.body);
  const videoUrl = req.body.videoUrl;
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  const videoDetails = await getVideoDetails(videoId);

  if (!videoDetails || !videoDetails.description) {
    return res.status(404).json({ error: '❌ Video not found or description unavailable' });
  }

  const timestampsAndTitles = extractTimestampsAndTitlesWithEndTimes(videoDetails.description);

  if (timestampsAndTitles.length === 0) {
    return res.status(400).json({ error: "❌ No timestamps found in description" });
  }

  function convertToSeconds(time) {
    if (!time) return 0;
    const parts = time.split(":").map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0]; // Just in case
  }

  // ✅ Fix: Ensure `end` doesn't break if YouTube ignores it
  const lectures = timestampsAndTitles.map((item) => ({
    title: item.title,
    startTime: item.startTime,
    endTime: item.endTime,
    videoUrl: `https://www.youtube.com/embed/${videoId}?start=${convertToSeconds(item.startTime)}`,
  }));

  const newCourse = new Course({
    videoId,
    title: videoDetails.title, // ✅ Corrected Title Assignment
    lectures,
  });

  try {
    await newCourse.save();
    res.json({ message: "✅ Course created successfully!", course: newCourse });
  } catch (err) {
    res.status(500).json({ error: "❌ Database error" });
  }
});

// 📌 Route to Fetch All Courses
app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "❌ Database error" });
  }
});

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server is running on port 5000"));
