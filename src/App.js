import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings";
import { Rooms } from "./pages/Rooms";
import { Users } from "./pages/Users";
import { Contact } from "./pages/Contact";
import { SideBar } from "./components/SideBar";
import { useState, createContext } from "react";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Header } from "./components/Header";
import { Layout, LeftContainer, RightContainer } from "./components/Layout";

export const GeneralContext = createContext(null);

function App() {

  const [authenticated,setAuthenticated] = useState(localStorage.getItem('logged')? true : false);
  const [viewSidebar, setViewSidebar] = useState(true);


  return (
    <BrowserRouter>
      <GeneralContext.Provider value={{viewSidebar,setViewSidebar,authenticated,setAuthenticated}}>
        <Layout>
         <LeftContainer><PrivateRoute><SideBar /></PrivateRoute></LeftContainer>
          <RightContainer><PrivateRoute><Header setAuthenticated={setAuthenticated}/></PrivateRoute>
            <Routes>
        
              <Route path="/" element={<PrivateRoute> <Dashboard/></PrivateRoute>}/>
              <Route path="/rooms" element={<PrivateRoute><Rooms /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/bookings" element={<PrivateRoute><Bookings /></PrivateRoute>} />
              <Route path="/contact" element={ <PrivateRoute><Contact /></PrivateRoute>} />
              <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          
            </Routes>
          </RightContainer>
        </Layout>
      </GeneralContext.Provider>
    </BrowserRouter>
  );
}

export default App;
