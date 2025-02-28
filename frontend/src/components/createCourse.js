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

    const convertTimestampToSeconds = (timestamp) => {
        const parts = timestamp.split(":").map(Number);
        return parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : parts[0] * 60 + parts[1];
    }

    const extractChaptersFromDescription = (description, videoId) => {
        const lines = description.split("\n");
        const chapterPattern = /(\d{1,2}:\d{2}(?::\d{2})?)\s+(.*)/;
        let chapters = [];
        for(let i = 0; i < lines.length ;i++ ){
            const match = lines[i].match(chapterPattern);
            if(match){
                let startTime = convertTimestampToSeconds(match[1]);
                let title = match[2];
                let endTime = i+1 < lines.length ? convertTimestampToSeconds(lines[i+1]
                    .match(chapterPattern)?.[1]): null
                chapters.push({
                        title,
                        videoUrl: `https://www.youtube.com/embed/${videoId}?start=${startTime}${endTime ? `&end=${endTime}` : ""}`,
                        startTime,
                        endTime
                });    
            }
        }
        return chapters;
    };


    const handleSubmit = async () => {

        if(!courseName || chapters.length === 0){
            alert("Error");
            return;
        }

        try{
            await axios.post("", {
                name: courseName,
                videos: chapters.map(chapter => videoUrl)
            })
            alert("Course created successfully!");
            setCourseName("");
            setVideoUrl("");
            setChapters([]);

        }catch(error){
            console.error(error);
            alert("Error creating course.");
        }
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
        <div>
            <h2>Create a Course</h2>

            <input
                type="text"
                placeholder="Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
            />

            <h3>Enter a YouTube Video URL</h3>
            <input
                type="text"
                placeholder="Enter Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
            />
            <button onClick={fetchVideoDetails}>Extract Chapters</button>

            {chapters.length > 0 && (
                <div>
                    <h3>Extracted Chapters</h3>
                    <ul>
                        {chapters.map((chapter, index) => (
                            <li key={index}>
                                <strong>{chapter.title}</strong> -
                                <a href={chapter.videoUrl} target="_blank" rel="noopener noreferrer"> Watch</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={handleSubmit}>Create Course</button>
        </div>
    );
}
