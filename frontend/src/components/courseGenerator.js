import { useState } from "react";
import { createCourse } from "./api";

export default function CourseGenerator(){

    const [videoUrl, setVideoUrl] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async ()=> {

        if(!videoUrl){
            setMessage("Please enter a valid url")
        }

        try{
            await createCourse(videoUrl);
            setMessage("Course created successfully");
            setVideoUrl("")

        }catch(error){
            setMessage("Error creating the course")
        }
    }
    
    return(
        <div>
            <h2>Create a course</h2>
            <input
            type = "text"
            placeholder="Enter URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            />

            <button onClick={handleSubmit}>
                Create Course
            </button>
            {message && <p>{message}</p>}
        </div>
    )
}