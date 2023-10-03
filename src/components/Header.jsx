import styled from "styled-components";
import icons from "../styles/icons";
import colors from "../styles/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { GeneralContext } from "../App";

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

const InnerLeft = styled.div`
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

const Button = styled.button`
  background-color: transparent;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  & svg {
    width: 24px;
    height: 24px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  &:hover {
    scale: 1.15;
    background-color: ${colors.lightGreen};
  }
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
            <Button onClick={handleSideBarView}>{icons.menu} </Button>
            <Title>{headerTitle === "" ? "Dashboard" : headerTitle}</Title>
          </InnerLeft>
          <InnerRight>
            <Button>{icons.message}</Button>
            <Button>{icons.bell}</Button>
            <Button onClick={handleLogout}>{icons.logout}</Button>
          </InnerRight>
        </InnerContainer>
      </HeaderContainer>
    </>
  );
};
