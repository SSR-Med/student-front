import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "/src/static/css/table.css"

import Course from "./routes/course";
import Student from "./routes/student";
import Student4Course from "./routes/student4course";
import Course4Student from "./routes/course4student";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Course/>} />
      <Route path="/student" element={<Student/>} />
      <Route path="/course/:id/students" element={<Student4Course/>} />
      <Route path="/student/:id/courses" element={<Course4Student/>} />
    </Routes>
  </BrowserRouter>
)
