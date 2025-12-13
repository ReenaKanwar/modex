import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import Header from "./Components/Header";
import { ShowProvider } from "./Contexts/ShowContext";
import { AuthProvider } from "./Contexts/AuthContext";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <ShowProvider>
        <BrowserRouter>
          
          <Header />

          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </ShowProvider>
    </AuthProvider>
  );
}
