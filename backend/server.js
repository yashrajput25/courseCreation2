require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const app = express();
const port = 3000;
const mongoose = require("mongoose")
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

function extractVideoId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

async function getVideoDescription(videoId) {
  try {
    const response = await youtube.videos.list({
      part: 'snippet',
      id: videoId,
    });
    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].snippet.description;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching video description:', error);
    return null;
  }
}

function extractTimestampsAndTitles(description) {
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

  return matches;
}

app.post('/timestamps', async (req, res) => {
  const videoUrl = req.body.videoUrl;
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  const description = await getVideoDescription(videoId);

  if (!description) {
    return res.status(404).json({ error: 'Video not found or description unavailable' });
  }

  const timestampsAndTitles = extractTimestampsAndTitles(description);

  res.json(timestampsAndTitles);
});


app.listen(5000, console.log("🚀Server is running on 5001 port"))