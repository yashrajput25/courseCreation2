import { useState } from "react";
import axios from "axios";
import "../css/CreateCourse.css"; // Import CSS file for styling

export default function CreateCourse() {

    const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY";

    // State variables for course creation
    const [courseName, setCourseName] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [chapters, setChapters] = useState([]);

    const extractVideoId = (url) => {
        const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
        return match ? match[1] : null
    }

    const fetchVideoDetails = async () => {
        const videoId = extractVideoId(videoUrl);
        if(!videoId){
            alert("Invalid Youtube Url");
            return;
        }

        try{
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=<VIDEO_ID>&key=<API_KEY>`
            );
            console.log(response);

            const description = response.data.items[0]?.snippet?.description || "";

            const extractedChapters = extractChaptersFromDescription(description, videoId);

            if(extractedChapters.length === 0){
                alert("No chpaters found in the description");
                return;
            }

            setChapters(extractedChapters);
            alert("Chapters extracted successfully!");

        }catch(error){
            console.error("Error fetching video details:", error);
            alert("Failed to fetch video details. Check API key and quota.");
        }
    }


    return (
        <div className="course-container">
            <h2 className="title">📚 Create a Course</h2>

            <label className="label">Course Name:</label>
            <input
                type="text"
                className="input"
                placeholder="Type Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                disabled={playlistUrl !== ""}
            />

            <label className="label">🎥 Enter a Playlist URL (Optional)</label>
            <input
                type="text"
                className="input"
                placeholder="Paste YouTube Playlist URL"
                value={playlistUrl}
                onChange={(e) => setPlayListUrl(e.target.value)}
            />

            <h3 className="section-title">📌 Add Individual Videos:</h3>
            {videos.map((video, index) => (
                <input
                    key={index}
                    type="text"
                    className="input"
                    placeholder="YouTube Video URL"
                    value={video}
                    onChange={(e) => handleVideoChange(index, e.target.value)}
                    disabled={playlistUrl !== ""}
                />
            ))}

            <div className="button-group">
                <button 
                    onClick={addMoreVideos} 
                    className="button add-video"
                    disabled={playlistUrl !== ""}
                >
                    ➕ Add Another Video
                </button>
                <button 
                    onClick={handleSubmit} 
                    className="button create-course"
                >
                    ✅ Create Course
                </button>
            </div>
        </div>
    );
}
