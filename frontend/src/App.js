import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import CourseList from "./components/courseList";
import CourseGenerator from "./components/courseGenerator";


function App(){
  return (
    <div>
    <h1>Course Splitter</h1>
    <Router>
      <nav>
        <li><Link to = "/">Create Course</Link></li>
        <li><Link to = "/courses">View Courses</Link></li>
      </nav>

<Routes>
  <Route path ="/" element={<CourseGenerator/>}/>
  <Route path ="/courses" element = {<CourseList/>}/>
</Routes>
</Router>
    </div>)
}


export default App;
