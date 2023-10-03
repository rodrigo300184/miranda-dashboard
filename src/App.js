import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings";
import { Rooms } from "./pages/Rooms";
import { Users } from "./pages/Users";
import { Contact } from "./pages/Contact";
import { SideBar } from "./components/SideBar";
import { useState, createContext, useReducer} from "react";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Header } from "./components/Header";
import { Layout, LeftContainer, RightContainer } from "./components/Layout";

export const GeneralContext = createContext(null);
const loginActionType = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE: "UPDATE",
};
const initialState = {username: '', 
                      email: '',
                      photo:'',
                      authenticated: false};

const reducer = (state, action) => {
  switch (action.type) {
    case loginActionType.LOGIN:
      console.log(action.payload)
      return {...action.payload,authenticated: true};
    case loginActionType.LOGOUT:
      localStorage.removeItem('logged');
      return {...initialState};
    case loginActionType.UPDATE:
      return {...state,email: action.payload};
    default: 
      return {...state};
  }
}

function App() {
  const [loginState, dispatchLogin] = useReducer(reducer, initialState);
  const [viewSidebar, setViewSidebar] = useState(true);
  console.log(loginState);
 
return (
    <BrowserRouter>
      <GeneralContext.Provider value={{viewSidebar,setViewSidebar,loginState,loginActionType,dispatchLogin}}>
        <Layout>
         <LeftContainer><PrivateRoute><SideBar /></PrivateRoute></LeftContainer>
          <RightContainer><PrivateRoute><Header/></PrivateRoute>
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
