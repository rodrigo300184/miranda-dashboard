import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Bookings } from "./pages/Bookings";
import { Rooms } from "./pages/Rooms";
import { Users } from "./pages/Users";
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

        <Route path="/rooms" element={ <><SideBar /><Rooms /></>} />
        <Route path="/bookings" element={ <><SideBar /><Bookings /></>} />
        <Route path="/contact" element={ <><SideBar /><Contact /></>} />
        <Route path="/users" element={ <><SideBar /><Users /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
