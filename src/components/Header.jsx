import styled from "styled-components";
import icons from "../styles/icons";

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0px 3px 10px #00000005;
  height: 120px;
  width: 100%;
`;

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  height:100%;
  justify-content: space-between;
  align-items:center;
`;

const Inner_left = styled.div`


`;
const Inner_right = styled.div`
display:flex;
gap:15px;
`;

export const Header = () => {
  return (
    <>
      <HeaderContainer>
        <InnerContainer>
         <Inner_right>{icons.message}{icons.bell} {icons.logout}</Inner_right>
        </InnerContainer>
      </HeaderContainer>
    </>
  );
};
