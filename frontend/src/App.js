import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import CreateCourse from "./components/createCourse";
import CourseList from "./components/courseList";
import ProfessorDashboard from "./components/ProfessorDashboard"; // Import the dashboard

function App(){
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to ="/create">Create Course </Link> |  <Link to="/dashboard">Professor Dashboard</Link>
      </nav>
      <Routes>
      <Route path = "/" element = { <CourseList/>} />
      <Route path = "/create" element = { <CreateCourse/>}/>
      <Route path="/professor_dashboard.html" element={<ProfessorDashboard />} /> {/* Route for Dashboard */}
      </Routes>
      
    </Router>

  );
}

export default App;
