import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings";
import { Rooms } from "./pages/Rooms";
import { Users } from "./pages/Users";
import { Contact } from "./pages/Contact";
import { SideBar } from "./components/SideBar";
import { useState, createContext, useReducer, useEffect} from "react";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Header } from "./components/Header";
import { Layout, LeftContainer, RightContainer } from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "./app/store";

export const GeneralContext = createContext(null);

const loginActionType = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE: "UPDATE",
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case loginActionType.LOGIN:
      return {...action.payload,authenticated: true};
    case loginActionType.LOGOUT:
      return {...state,authenticated: false};
    case loginActionType.UPDATE:
      console.log(action.payload)
      return {...state,...action.payload};
    default: 
      return {...state};
  }
}

function App() {

  const  initialLoginState = () => {
    if (localStorage.getItem('logged')) {
        return JSON.parse(localStorage.getItem('logged'));
    } else {
        return {authenticated: false, username: null, email: null, photo: null};
    }
  } 
  const [loginState, dispatchLogin] = useReducer(loginReducer, initialLoginState());
  const [viewSidebar, setViewSidebar] = useState(true);

  useEffect(() => {
      localStorage.setItem('logged', JSON.stringify(loginState));
  }, [loginState]);
 
return (
    <BrowserRouter>
     <Provider store={store}>
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
      </Provider>
    </BrowserRouter>
  );
}

export default App;
