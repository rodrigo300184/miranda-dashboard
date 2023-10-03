import Swal from "sweetalert2";
import styled from "styled-components";
import hotelIcon from "../icons/5-estrellas.png";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import colors from "../styles/colors";
import { GeneralContext } from "../App";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 100vh;
`;
const Image = styled.img`
  margin-bottom: 10px;
  height: 120px;
  width: 120px;
`;

const Form = styled.form`
  box-shadow: 0px 16px 30px #00000014;
  text-align: center;
  background-color: white;
  padding: 25px 35px;
  border-radius: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 5px;
`;
const Input = styled.input`
  font-size: 18px;
  padding: 5px;
  margin-bottom: 30px;
  border: none;
  outline: none;
  border-bottom: 2px solid ${colors.bottomBorderGray};
`;
const Button = styled.button`
  display: block;
  border: none;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  padding: 10px 40px;
  color: ${colors.hardGreen};
  background: ${colors.lightGreen} 0% 0% no-repeat padding-box;
  margin: 0 auto 30px;
  &:hover {
    color: ${colors.lightGreen};
    background-color: ${colors.hardGreen};
  }
`;
const P = styled.p`
  margin: 1px;
  font-size: 12px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const H1 = styled.h1`
  color: black;
  margin: 5px 0px 25px;
  max-height: 35px;
  font-size: 36px;
  & span {
    color: ${colors.red};
    line-height: 30px;
  }
`;

export const Login = () => {
  const { loginState, loginActionType, dispatchLogin } =
    useContext(GeneralContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "email@email.com" && password === "1234") {
      dispatchLogin({
        type: loginActionType.LOGIN,
        payload: {
          username:
            JSON.parse(localStorage.getItem("logged")).username ||
            "Default Username",
          email: JSON.parse(localStorage.getItem("logged")).email || email,
          photo: "",
        },
      });
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid login: Check Email or Password",
      });
    }
  };

  useEffect(() => {
    if (loginState.authenticated === true) {
      navigate("/");
    }
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Image src={hotelIcon} />

        <H1>
          travl <span>Login</span>
        </H1>

        <Label htmlFor="email">Email:</Label>
        <Input
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          required
          autoComplete="on"
        />
        <Label htmlFor="password">Password:</Label>
        <Input
          onChange={handlePasswordChange}
          type="password"
          name="password"
          id="password"
          required
          autoComplete="current-password"
        />
        <Button type="submit">Login</Button>
        <P bold="true">To see the demo:</P>
        <P>Mail: email@email.com</P>
        <P>Password: 1234</P>
      </Form>
    </Container>
  );
};
