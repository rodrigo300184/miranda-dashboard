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
import { Layout, LeftContainer, RightContainer } from "./components/Layout";

function App() {

  const [authenticated,setAuthenticated] = useState(localStorage.getItem('logged')? true : false);
  

  return (
    <BrowserRouter>
      <Layout>
       <LeftContainer><PrivateRoute authenticated={authenticated}><SideBar /></PrivateRoute></LeftContainer>
       <RightContainer><PrivateRoute authenticated={authenticated}><Header setAuthenticated={setAuthenticated}/></PrivateRoute>
        <Routes>
        
          <Route path="/login" element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
          <Route path="/" element={<PrivateRoute authenticated={authenticated}> <Dashboard/></PrivateRoute>}/>
          <Route path="/rooms" element={<PrivateRoute authenticated={authenticated}><Rooms /></PrivateRoute>} />
          <Route path="/bookings" element={<PrivateRoute authenticated={authenticated}><Bookings /></PrivateRoute>} />
          <Route path="/contact" element={ <PrivateRoute authenticated={authenticated}><Contact /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute authenticated={authenticated}><Users /></PrivateRoute>} />
          
        </Routes>
        </RightContainer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
