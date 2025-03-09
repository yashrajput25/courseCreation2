// import { useState, useEffect } from "react";
// import { getCourse } from "./api";



// export default function CourseList(){
//     const [courses, setCourses] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState(null);

//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     const fetchCourses = async () => {
//         try{
//             const data = await getCourse();
//             setCourses(data)
//             console.log("📥 Courses received in frontend:", data);
            

//         }catch(error){
//             console.log("error", error)
//         }
//     }


//     return(
// <div>
//     <h2>Available Courses</h2>
//     {courses.length === 0 ? <p>No courses Available</p> : null}

//     {courses.map((course, index) => (
//         <div key = {index}>
//             <h3 onClick={()=> setSelectedCourse(selectedCourse === index ? null : index)}>
//                 {course.title}
//                 {selectedCourse === index ? "🔼" : "🔽"}
//             </h3>
//             {selectedCourse === index && (
//                 <div>

//                 {course.lectures.map((lecture, i) => (
//                     <div key = {i}>
//                 <h4>{lecture.title}</h4>
//                 <iframe
//                     width="100"
//                     height="100"
//                     src={lecture.videoUrl}
//                     allowFullScreen
//                 ></iframe>
//                     </div>
//                 ))}
//                 </div>  
//             )} 
            
//             </div>
//     ))}

// </div>
//     );
// }

import { useState, useEffect } from "react";
import { getCourse } from "./api";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourse();
      setCourses(data);
      console.log("📥 Courses received in frontend:", data);
    } catch (error) {
      console.error("🚨 Error fetching courses:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Courses</h2>
      {courses.length === 0 ? <p style={styles.noCourses}>No courses available</p> : null}

      {courses.map((course, index) => (
        <div key={index} style={styles.courseContainer}>
          {/* Course Title (Clickable to Expand/Collapse) */}
          <h3
            onClick={() => setSelectedCourse(selectedCourse === index ? null : index)}
            style={styles.courseTitle}
          >
            {course.title} {selectedCourse === index ? "🔼" : "🔽"}
          </h3>

          {/* Expandable Lecture List */}
          {selectedCourse === index && (
            <div style={styles.lectureList}>
              {course.lectures.map((lecture, i) => (
                <div key={i} style={styles.lectureItem}>
                  <h4 style={styles.lectureTitle}>{lecture.title}</h4>
                  <iframe
                    width="100%"
                    height="250"
                    src={lecture.videoUrl}
                    allowFullScreen
                    style={styles.videoFrame}
                  ></iframe>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Basic styles for a YouTube-like playlist look
const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  noCourses: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
  courseContainer: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "15px",
    backgroundColor: "#fff",
  },
  courseTitle: {
    margin: "0",
    padding: "15px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  lectureList: {
    padding: "15px",
    backgroundColor: "#fff",
  },
  lectureItem: {
    marginBottom: "10px",
    paddingBottom: "10px",
    borderBottom: "1px solid #ddd",
  },
  lectureTitle: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "5px",
  },
  videoFrame: {
    borderRadius: "8px",
  },
};

