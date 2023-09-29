import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import icons from "../styles/icons";
import colors from "../styles/colors";
import hotelIcon from "../icons/5-estrellas.png";
import EditUser from "../components/EditUser";

const SideMenuContainer = styled.div`
  width: 345px;
  background-color: white;
  padding: 32px 0px;
  z-index: 5;
  box-shadow: 13px 3px 40px #00000005;
  float: left;
`;

const NavItem = styled.li`
  color: ${colors.green};
  font-weight: 600;
  padding: 20px 56px 20px 50px;
  position: relative;
  list-style: none;
  &.active {
    color: ${colors.red};
    &::after {
      content: "";
      width: 8px;
      height: 67px;
      background-color: ${colors.red};
      border-radius: 0px 6px 6px 0px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  & a {
    text-decoration: none;
  }
  & i {
    margin-right: 15px;
  }
`;

const UserContainer = styled.div`
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 18px;
  text-align: center;
  padding: 24px 35px;
  margin: 41px auto 62px;
  min-width: 230px;
  width: fit-content;
  & p {
    font-weight: 500;
    display: block;
  }
  & span {
    font-weight: 200;
    font-size: 12px;
    line-height: 18px;
    color: blue;
    margin-bottom: 16px;
    display: block;
  }
`;

const UserPhoto = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  background-color: #c5c5c5;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto 15px;
`;

const SideMenuFooter = styled.div`
  padding-left: 56px;
  & .sidemenu-footer {
    &__name {
      font-weight: 600;
      display: block;
    }
    &__copy {
      font-weight: 200;
      font-size: 14px;
      line-height: 21px;
      color: blue;
      display: block;
    }
    &__made {
      margin-bottom: 50px;
      color: red;
    }
  }
`;

const StyledLink = styled(Link)`
  margin-left: 20px;
`;
const Image = styled.img`
  height: 60px;
  width: 60px;
`;

const Logo = styled.div`
  margin-left: 50px;
  margin-bottom: 62px;
  display: flex;
  gap: 20px;
`;

const LetterHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const H1 = styled.h1`
  margin-top: -1px;
  max-height: 35px;
  font-size: 36px;
`;
const H2 = styled.h2`
  font-size: 12px;
  font-weight: 300;
`;

export const SideBar = () => {
  
  const location = useLocation();

  const [user, setUser] = useState(localStorage.getItem('username') || 'Name Lastname');
  const [email, setEmail] = useState(localStorage.getItem('email') || 'email@email.com');

  useEffect(() => {
    let path = location.pathname.split("/")[1];
    if (path === "") path = "dashboard";

    const activeItem = document.querySelector(`#${path}`);
    activeItem.classList.add("active");

    return () => activeItem.classList.remove("active");
  }, [location]);

  return (
    <SideMenuContainer>
      <Logo>
        <Image src={hotelIcon} />{" "}
        <LetterHead>
          <H1>travl</H1> <H2>Hotel Admin Dashboard</H2>
        </LetterHead>
      </Logo>
      <ul>
        <NavItem id="dashboard">
          {icons.dashboard}
          <StyledLink to="/">Dashboard</StyledLink>
        </NavItem>
        <NavItem id="bookings">
          {icons.bookings}
          <StyledLink to="/bookings">Bookings</StyledLink>
        </NavItem>
        <NavItem id="rooms">
          {icons.rooms}
          <StyledLink to="/rooms">Rooms</StyledLink>
        </NavItem>
        <NavItem id="contact">
          {icons.contact}
          <StyledLink to="/contact">Contact</StyledLink>
        </NavItem>
        <NavItem id="users">
          {icons.users}
          <StyledLink to="/users">Users</StyledLink>
        </NavItem>
      </ul>
      <UserContainer>
        <UserPhoto style={{backgroundImage: `url('https://robohash.org/${user}.png')`}} />
        <p>{user}</p>
        <span>
          {email}
        </span>
        <EditUser email={email} setEmail={setEmail} user={user} setUser={setUser} />
      </UserContainer>
      <SideMenuFooter>
        <span className="sidemenu-footer__name">
          Travl Hotel Admin Dashboard
        </span>
        <span className="sidemenu-footer__copy">
          © 2023 All Rights Reserved
        </span>
        <br />
        <br />
        <span className="sidemenu-footer__made">Made with ♥ by Rodrigo</span>
      </SideMenuFooter>
    </SideMenuContainer>
  );
};
