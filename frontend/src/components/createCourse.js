import { useState } from "react";
import axios from "axios";
import "../css/CreateCourse.css"; // Import CSS file for styling

export default function CreateCourse() {
    // State variables for course creation
    const [courseName, setCourseName] = useState("");
    const [videos, setVideos] = useState([""]);
    const [playlistUrl, setPlayListUrl] = useState("");

    // Handles input change for videos
    const handleVideoChange = (index, value) => {
        const updatedVideos = [...videos];
        updatedVideos[index] = value;
        setVideos(updatedVideos);
    };

    // Adds a new empty input field for video URLs
    const addMoreVideos = () => setVideos([...videos, ""]);

    // Handles form submission
    const handleSubmit = async () => {
        if (!courseName || ((!videos || videos.length === 0) && !playlistUrl)) {
            alert("Course name and at least one video or playlist URL is required!");
            return;
        }

        try {
            await axios.post("http://localhost:5001/api/courses/create", {
                name: courseName,
                videos: videos.filter(v => v !== ""), // Removes empty video fields
                playlistUrl: playlistUrl || null
            });
            alert("Course created successfully!");
            setCourseName("");
            setVideos([""]);
            setPlayListUrl("");
        } catch (error) {
            alert("Error creating the course.");
        }
    };

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
