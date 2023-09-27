import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Bookings } from "./pages/Bookings";
import { Rooms } from "./pages/Rooms";
import { Guest } from "./pages/Guest";
import { Concierge } from "./pages/Concierge";
import { Contact } from "./pages/Contact";
import { SideBar } from "./components/SideBar";
import { useState } from "react";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {

  const [authenticated,setAuthenticated] = useState(localStorage.getItem('logged')||false);

  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route
          path="/"
          element={
            <PrivateRoute authenticated={authenticated}>
              
              <SideBar />
           
            </PrivateRoute>
          }/>

        <Route path="/rooms" element={<Rooms />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/concierge" element={<Concierge />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
