import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CompanyDirectory from "./pages/CompanyDirectory";
import Companies from "./pages/Companies";
import Comparison from "./pages/Comparison";
import Roles from "./pages/Roles";
import TechStack from "./pages/TechStack";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<CompanyDirectory />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/techstack" element={<TechStack />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;