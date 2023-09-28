import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings";
import { Rooms } from "./pages/Rooms";
import { Users } from "./pages/Users";
import { Contact } from "./pages/Contact";
import { SideBar } from "./components/SideBar";
import { useState } from "react";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Header } from "./components/Header";

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
              
              <SideBar /><Header/><Dashboard/>
           
            </PrivateRoute>
          }/>

        <Route path="/rooms" element={ <><SideBar /><Header/><Rooms /></>} />
        <Route path="/bookings" element={ <><SideBar /><Header/><Bookings /></>} />
        <Route path="/contact" element={ <><SideBar /><Header/><Contact /></>} />
        <Route path="/users" element={ <><SideBar /><Header/><Users /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
