import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CourseList from "./components/courseList";
import CourseGenerator from "./components/courseGenerator";

function App() {
  return (
    <Router>
      <div style={styles.container}>
        {/* Header */}
        <h1 style={styles.header}>📚 Course Creator</h1>

        {/* Navigation Bar */}
        <nav style={styles.navbar}>
          <Link to="/" style={styles.navLink}>➕ Create Course</Link>
        </nav>
        <div  style={styles.spacer}>

        </div>
        <nav style={styles.navbar}>
          <Link to="/courses" style={styles.navLink}>📋 View Courses</Link>
        </nav>

        {/* Routes */}
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<CourseGenerator />} />
            <Route path="/courses" element={<CourseList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Inline Styles for Better UI
const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  header: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "20px",
  },
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "10px",
    backgroundColor: "#007bff",
    borderRadius: "8px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px",
    transition: "background 0.3s",
  },
  content: {
    marginTop: "20px",
    padding: "20px",
  },
  spacer: {
    marginTop:"2px"
  }
};

export default App;
