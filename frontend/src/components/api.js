import axios from "axios"

const API_URL = "http://localhost:5000";

export const createCourse = async (videoURL) => {
    const response = await axios.post(`${API_URL}/timestamps`, { videoURL });
    return response.data;
}

export const getCourse = async() => {
    const response = await axios.get(`${API_URL}/course`);
    return response.data;
} 