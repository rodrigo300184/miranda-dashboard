import styled from "styled-components";
import hotelIcon from "../icons/5-estrellas.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 100vh;
`;
const Image = styled.img`
  height: 120px;
  width: 120px;
`;

const Form = styled.form`
  box-shadow: 0px 16px 30px #00000014;
  text-align: center;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
`;
const H2 = styled.h2`
  color: #e23428;
  line-height: 30px;
  cursor: default;
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
  border-bottom: 2px solid #c5c5c5;
`;
const Button = styled.button`
  display: block;
  border: none;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  padding: 10px 40px;
  color: #135846;
  background: #ebf1ef 0% 0% no-repeat padding-box;
  margin: 0 auto 30px;
  &:hover {
    color: #ebf1ef;
    background-color: #135846;
  }
`;
const P = styled.p`
  margin: 1px;
  font-size: 12px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

export const Login = (props) => {
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
    console.log(email, password);
    if (email === "email@email.com" && password === "1234") {
      props.setAuthenticated(true);
      localStorage.setItem("logged", true);
      navigate("/");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Image src={hotelIcon} />
        <H2>Login</H2>
        <Label>Email:</Label>
        <Input
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          required
        />
        <Label>Password:</Label>
        <Input
          onChange={handlePasswordChange}
          type="password"
          name="password"
          id="password"
          required
        />
        <Button type="submit">Login</Button>
        <P bold="true">To see the demo:</P>
        <P>Mail: email@email.com</P>
        <P>Password: 1234</P>
      </Form>
    </Container>
  );
};
