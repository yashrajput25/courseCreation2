// import { useState, useEffect } from "react";
// import axios from "axios";

// const CourseList = () => {
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5001/api/courses/all");
//                 setCourses(response.data);
//             } catch (error) {
//                 console.error("Error fetching courses", error);
//             }
//         };
//         fetchCourses();
//     }, []);

//     return (
//         <div>
//             <h2>Available Courses</h2>
//             {courses.length === 0 ? (
//                 <p>No courses available</p>
//             ) : (
//                 courses.map((course) => (
//                     <div key={course._id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "20px" }}>
//                         <h3>{course.name}</h3>

//                         {/* Display YouTube Playlist if available */}
//                         {course.playlistUrl ? (
//                             <iframe
//                                 width="560"
//                                 height="315"
//                                 src={`https://www.youtube.com/embed/videoseries?list=${course.playlistUrl.split("list=")[1]}`}
//                                 title="YouTube Playlist"
//                                 frameBorder="0"
//                                 allowFullScreen
//                             ></iframe>
//                         ) : (
//                             // Otherwise, display individual videos
//                             course.videos.map((video, index) => {
//                                 let videoId = "";

//                                 // Extract YouTube Video ID from different URL formats
//                                 if (video.includes("youtube.com/watch?v=")) {
//                                     videoId = video.split("v=")[1]?.split("&")[0];
//                                 } else if (video.includes("youtu.be/")) {
//                                     videoId = video.split("youtu.be/")[1]?.split("?")[0];
//                                 }

//                                 return videoId ? (
//                                     <iframe
//                                         key={index}
//                                         width="300"
//                                         height="200"
//                                         src={`https://www.youtube.com/embed/${videoId}`}
//                                         title={`YouTube Video ${index + 1}`}
//                                         frameBorder="0"
//                                         allowFullScreen
//                                     ></iframe>
//                                 ) : (
//                                     <p key={index} style={{ color: "red" }}>
//                                         Invalid YouTube URL
//                                     </p>
//                                 );
//                             })
//                         )}
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default CourseList;

import { useState, useEffect } from "react";
import axios from "axios";
import "../css/CourseList.css"; // Import CSS for styling

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/courses/all");
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses", error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="course-container">
            <h2 className="heading">📚 Available Courses</h2>
            {courses.length === 0 ? (
                <p className="no-courses">No courses available</p>
            ) : (
                courses.map((course) => (
                    <div key={course._id} className="course-card">
                        <h3 className="course-title">{course.name}</h3>

                        {/* Display YouTube Playlist if available */}
                        {course.playlistUrl ? (
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/videoseries?list=${course.playlistUrl.split("list=")[1]}`}
                                title="YouTube Playlist"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="video-container">
                                {course.videos.map((video, index) => {
                                    let videoId = "";

                                    // Extract YouTube Video ID from different URL formats
                                    if (video.includes("youtube.com/watch?v=")) {
                                        videoId = video.split("v=")[1]?.split("&")[0];
                                    } else if (video.includes("youtu.be/")) {
                                        videoId = video.split("youtu.be/")[1]?.split("?")[0];
                                    }

                                    return videoId ? (
                                        <iframe
                                            key={index}
                                            width="300"
                                            height="200"
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={`YouTube Video ${index + 1}`}
                                            frameBorder="0"
                                            allowFullScreen
                                            className="video-frame"
                                        ></iframe>
                                    ) : (
                                        <p key={index} className="invalid-url">
                                            ❌ Invalid YouTube URL
                                        </p>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default CourseList;

