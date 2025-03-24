import { useState, useEffect } from "react";
import { uploadExcelFile, getUploadedFiles, getVideosFromFile, getVideoTimestamps } from "./components/api";

export default function App() {
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  // 📂 Fetch uploaded Excel files
  const fetchFiles = async () => {
    try {
      const response = await getUploadedFiles();
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // 📤 Upload a new Excel file
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await uploadExcelFile(file);
      alert("✅ File uploaded successfully!");
      fetchFiles(); // Refresh file list
    } catch (error) {
      alert("❌ Error uploading file.");
      console.error("Upload error:", error);
    }
  };

  // 📺 Fetch videos from a selected file
  const fetchVideos = async (file) => {
    setSelectedFile(file);
    setSelectedVideo(null);
    setTimestamps([]);
    try {
      const response = await getVideosFromFile(file._id);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // 🎬 Fetch timestamps from a selected video
  const fetchTimestamps = async (video) => {
    setSelectedVideo(video);
    try {
      const response = await getVideoTimestamps(video._id);
      setTimestamps(response.data);
    } catch (error) {
      console.error("Error fetching timestamps:", error);
    }
  };

  return (
    <div>
      <h1>Course creation</h1>

      {/* File Upload */}
      <h2>Upload an Excel File</h2>
      <input type="file" onChange={handleUpload} />

      {/* File List */}
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file._id} onClick={() => fetchVideos(file)}>
            📂 {file.filename}
          </li>
        ))}
      </ul>

      {/* Video List */}
      {selectedFile && (
        <>
          <h2>Videos in {selectedFile.filename}</h2>
          <ul>
            {videos.map((video) => (
              <li key={video._id} onClick={() => fetchTimestamps(video)}>
                ▶ {video.youtubeurl}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Mini-Clips */}
      {selectedVideo && (
        <>
          <h2>Mini-Clips from Selected Video</h2>
          {timestamps.length === 0 ? <p>No timestamps found</p> : null}
          {timestamps.map((clip, index) => (
            <div key={index}>
              <h3>{clip.title}</h3>
              <YouTubeEmbed videoUrl={selectedVideo.youtubeurl} startTime={clip.startTime} endTime={clip.endTime} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
function YouTubeEmbed({ videoUrl, startTime, endTime }) {
  const [isEmbeddable, setIsEmbeddable] = useState(true);
  const videoId = extractVideoId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${convertToSeconds(startTime)}&end=${convertToSeconds(endTime)}`;

  useEffect(() => {
    // Try to load the video in an iframe
    const testIframe = document.createElement("iframe");
    testIframe.src = embedUrl;
    testIframe.style.display = "none";
    document.body.appendChild(testIframe);

    testIframe.onload = () => {
      setIsEmbeddable(true);
      testIframe.remove();
    };

    testIframe.onerror = () => {
      setIsEmbeddable(false);
      testIframe.remove();
    };

    return () => testIframe.remove();
  }, [embedUrl]);

  return isEmbeddable ? (
    <iframe width="560" height="315" src={embedUrl} allowFullScreen></iframe>
  ) : (
    <p>
      🚫 This video cannot be embedded. <br />
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
    </p>
  );
}

function extractVideoId(url) {
  if (!url) return ""; // ✅ Prevents calling .match() on undefined
  const regExp = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}



// ⏳ Convert HH:MM:SS to Seconds
function convertToSeconds(time) {
  const parts = time.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0];
}
