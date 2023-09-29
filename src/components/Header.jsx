import styled from "styled-components";
import icons from "../styles/icons";
import colors from "../styles/colors";
import { useNavigate } from "react-router-dom";

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
min-width: 30px;
min-height: 30px;
border-radius: 8px;
position: relative;
cursor:pointer;
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
&:hover{
    scale:1.15;
    background-color: ${colors.lightGreen}
  }
`;

export const Header = (props) => {

    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.setItem('logged',false);
        props.setAuthenticated('false');
        navigate('/login');
    }

  return (
    <>
      <HeaderContainer>
        <InnerContainer>
          <InnerLeft><Button>{icons.menu}</Button></InnerLeft>
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
