// import { useState } from "react";
// import { createCourse } from "./api";

// export default function CourseGenerator(){

//     const [videoUrl, setVideoUrl] = useState("")
//     const [message, setMessage] = useState("")

//     const handleSubmit = async ()=> {

//         if(!videoUrl){
//             setMessage("Please enter a valid url")
//         }

//         try{
//             await createCourse(videoUrl);
//             setMessage("Course created successfully");
//             setVideoUrl("")

//         }catch(error){
//             setMessage("Error creating the course")
//         }
//     }
    
//     return(
//         <div>
//             <h2>Create a course</h2>
//             <input
//             type = "text"
//             placeholder="Enter URL"
//             value={videoUrl}
//             onChange={(e) => setVideoUrl(e.target.value)}
//             />

//             <button onClick={handleSubmit}>
//                 Create Course
//             </button>
//             {message && <p>{message}</p>}
//         </div>
//     )
// }

import { useState } from "react";
import { createCourse } from "./api";

export default function CourseGenerator() {
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!videoUrl) {
      setMessage("❌ Please enter a valid URL");
      return;
    }

    try {
      await createCourse(videoUrl);
      setMessage("✅ Course created successfully!");
      setVideoUrl("");
    } catch (error) {
      setMessage("❌ Error creating the course");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create a Course</h2>
      
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSubmit} style={styles.button}>
        Create Course
      </button>

      {message && <p style={message.includes("❌") ? styles.errorMessage : styles.successMessage}>
        {message}
      </p>}
    </div>
  );
}

// Basic inline styles for a clean look
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "20px",
    marginBottom: "15px",
  },
  input: {
    width: "90%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  successMessage: {
    color: "green",
    fontSize: "14px",
    marginTop: "10px",
  },
  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
};
