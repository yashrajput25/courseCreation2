import axios from "axios"

const API_URL = "http://localhost:5000";

export const createCourse = async (videoUrl) => {
    console.log("Sending video URL:", videoUrl);
    const response = await axios.post("http://localhost:5000/timestamps", { videoUrl });
    return response.data;
}

export const getCourse = async() => {
    const response = await axios.get("http://localhost:5000/courses");
    return response.data;
} 