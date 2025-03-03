import { useState, useEffect } from "react";
import { getCourse } from "./api";



export default function CourseList(){
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try{
            const data = await getCourse();
            setCourses(data)
            console.log("📥 Courses received in frontend:", data);
            

        }catch(error){
            console.log("error", error)
        }
    }


    return(
<div>
    <h2>Available Courses</h2>
    {courses.length === 0 ? <p>No courses Available</p> : null}

    {courses.map((course, index) => (
        <div key = {index}>
            <h3 onClick={()=> setSelectedCourse(selectedCourse === index ? null : index)}>
                {course.title}
                {selectedCourse === index ? "🔼" : "🔽"}
            </h3>
            {selectedCourse === index && (
                <div>

                {course.lectures.map((lecture, i) => (
                    <div key = {i}>
                <h4>{lecture.title}</h4>
                <iframe
                    width="100"
                    height="100"
                    src={lecture.videoUrl}
                    allowFullScreen
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


// export default function CourseList() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null); // Track which course is expanded

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const data = await getCourse();
//       setCourses(data);
//     } catch (error) {
//       console.error("🚨 Error fetching courses:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Available Courses</h2>
//       {courses.length === 0 ? <p>No courses found.</p> : null}

//       {courses.map((course, index) => (
//         <div key={index} style={styles.courseContainer}>
//           {/* Course Title (Clickable) */}
//           <h3
//             onClick={() => setSelectedCourse(selectedCourse === index ? null : index)}
//             style={styles.courseTitle}
//           >
//             {course.title} {selectedCourse === index ? "🔼" : "🔽"}
//           </h3>

//           {/* Expandable Lecture List */}
//           {selectedCourse === index && (
//             <div style={styles.lectureList}>
//               {course.lectures.map((lecture, i) => (
//                 <div key={i} style={styles.lectureItem}>
//                   <h4>{lecture.title}</h4>
//                   <iframe
//                     width="560"
//                     height="315"
//                     src={lecture.videoUrl}
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// // Basic styles for a cleaner look
// const styles = {
//   courseContainer: {
//     border: "1px solid #ddd",
//     padding: "10px",
//     marginBottom: "10px",
//     cursor: "pointer",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "5px",
//   },
//   courseTitle: {
//     margin: "0",
//     padding: "10px",
//     backgroundColor: "#ddd",
//     cursor: "pointer",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   lectureList: {
//     padding: "10px",
//     backgroundColor: "#fff",
//   },
//   lectureItem: {
//     marginBottom: "10px",
//     borderBottom: "1px solid #ddd",
//     paddingBottom: "10px",
//   },
// };
