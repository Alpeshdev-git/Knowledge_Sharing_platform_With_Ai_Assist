import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateArticle from "./pages/CreateArticle";
import Dashboard from "./pages/DashBoard";
import Navbar from "./components/Navbar";
import AiImprove from "./pages/AiImprove";
import AiSummary from "./pages/AiSummary";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/ai-improve" element={<AiImprove />} />
       <Route path="/ai-summary" element={<AiSummary />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;