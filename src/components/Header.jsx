import styled from "styled-components";
import icons from "../styles/icons";
import colors from "../styles/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { GeneralContext } from "../App";
import { HeaderButton } from "./HeaderButton";

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0px 3px 10px #00000005;
  height: 120px;
  width: 100%;
  color: ${colors.hardGreen};
`;

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const InnerLeft = styled.div`
  display: flex;
  align-items:center;
  color: black;
  padding: 0 30px;
`;
const InnerRight = styled.div`
  padding: 0 40px;
  display: flex;
  gap: 50px;
`;



const Title = styled.h1`
  margin-left: 50px;
  font-size: 28px;
  font-weight: 600;
`;

export const Header = (props) => {
  const {viewSidebar, setViewSidebar, dispatchLogin, loginActionType} = useContext(GeneralContext);

  const [headerTitle, setHeaderTitle] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatchLogin({type: loginActionType.LOGOUT});
    navigate("/login");
  };
  useEffect(() => {
    let path = location.pathname.split("/")[1];
    path = path.charAt(0).toUpperCase() + path.slice(1);
    setHeaderTitle(path);
  }, [location]);

  const handleSideBarView = () =>{
    setViewSidebar(!viewSidebar);
  }

  return (
    <>
      <HeaderContainer>
        <InnerContainer>
          <InnerLeft>
            <HeaderButton color={'red'} onClick={handleSideBarView} icon={icons.menu} data-testid='sidebar-button'/> 
            <Title>{headerTitle === "" ? "Dashboard" : headerTitle}</Title>
          </InnerLeft>
          <InnerRight>
            <HeaderButton icon={icons.message} />
            <HeaderButton icon={icons.bell} />
            <HeaderButton icon={icons.logout} onClick={handleLogout}/>
          </InnerRight>
        </InnerContainer>
      </HeaderContainer>
    </>
  );
};
