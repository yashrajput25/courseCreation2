// import axios from "axios";

// const API_URL = "http://localhost:5000/api"; // Backend URL

// // Upload an Excel file
// export const uploadExcelFile = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   return await axios.post(`${API_URL}/upload-excel`, formData);
// };

// // Get list of uploaded Excel files
// export const getUploadedFiles = async () => {
//   return await axios.get(`${API_URL}/files`);
// };

// // Get list of videos from an Excel file
// export const getVideosFromFile = async (fileId) => {
//   return await axios.get(`${API_URL}/files/${fileId}/videos`);
// };

// // Get timestamps from a selected video
// export const getVideoTimestamps = async (videoId) => {
//   return await axios.get(`${API_URL}/videos/${videoId}`);
// };


import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend URL

// Upload an Excel file
export const uploadExcelFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await axios.post(`${API_URL}/upload-excel`, formData);
};

// Get list of uploaded Excel files
export const getUploadedFiles = async () => {
  return await axios.get(`${API_URL}/files`);
};

// Get list of videos from an Excel file
export const getVideosFromFile = async (fileId) => {
  return await axios.get(`${API_URL}/files/${fileId}/videos`);
};

// Get timestamps from a selected video
export const getVideoTimestamps = async (videoId) => {
  return await axios.get(`${API_URL}/videos/${videoId}`);
};