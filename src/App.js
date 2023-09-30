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

  const [authenticated,setAuthenticated] = useState(localStorage.getItem('logged')? true : false);
  

  return (
    <BrowserRouter>
     
      <Routes>
        
        <Route path="/login" element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
        <Route path="/" element={<PrivateRoute authenticated={authenticated}> <SideBar /><Header setAuthenticated={setAuthenticated}/><Dashboard/></PrivateRoute>}/>
        <Route path="/rooms" element={<PrivateRoute authenticated={authenticated}><SideBar /><Header/><Rooms /></PrivateRoute>} />
        <Route path="/bookings" element={<PrivateRoute authenticated={authenticated}><SideBar /><Header/><Bookings /></PrivateRoute>} />
        <Route path="/contact" element={ <PrivateRoute authenticated={authenticated}><SideBar /><Header/><Contact /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute authenticated={authenticated}><SideBar /><Header/><Users /></PrivateRoute>} />
          
      </Routes>

    </BrowserRouter>
  );
}

export default App;
