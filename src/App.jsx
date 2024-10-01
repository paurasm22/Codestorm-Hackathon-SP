import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Schemefinder from "./Pages/Schemefinder";
import Documents from "./Pages/Documents";
import DocumentDisply from "./Pages/DocumentDisply";
import Landing from "./Pages/Landing";
import Profile from "./Pages/Profile";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/schemefinder" element={<Schemefinder />} />
          <Route path="/document" element={<Documents />} />
          <Route path="/documentdisplay" element={<DocumentDisply />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
