import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CalendarPage from "./pages/Calendar";
import Post from "./pages/Post";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Router.jsx 생성해서 분리 해도 됨. */}
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/post" element={<Post />} />
          

        </Routes>
      </Router>
    </div>
  );
}


export default App;
