import React, { useState, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styled from "styled-components";
import colors from "../styles/colors";
import icons from "../styles/icons";
import { GeneralContext } from "../App";

const Button = styled.button.attrs({ type: "button" })`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => (props.green ? colors.lightGreen : colors.lightRed)};
  background-color: ${(props) => (props.green ? colors.hardGreen : colors.red)};
  border-radius: 8px;
  cursor: pointer;
  padding: 12px 40px;
  margin: 0 auto;
  border: 1px solid;
  &:hover {
    color: ${colors.hardGreen};
    background-color: ${(props) =>
      props.green ? colors.lightGreen : colors.red};
  }
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
  margin-bottom: 15px;
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
const SubmitButton = styled.button`
  display: block;
  border: none;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  padding: 10px 40px;
  color: #135846;
  background: #ebf1ef 0% 0% no-repeat padding-box;
  margin: 10px auto 0px;
  &:hover {
    color: #ebf1ef;
    background-color: #135846;
  }
`;

const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
`;

const Icon = styled.i`
  position:absolute;
  right: 5px;
  top: 5px;
  color: ${colors.green}
`;

export default function TransitionsModal(props) {
  const {loginActionType, dispatchLogin} = useContext(GeneralContext);
  const oldEmail = localStorage.getItem("email");
  const oldUser = localStorage.getItem("username");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleSave = () => {
    dispatchLogin({type: loginActionType.UPDATE, payload: props.email})
    localStorage.setItem("username", props.user);
    setOpen(false);
  };

  const handleEmailChange = (event) => {
    props.setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    props.setUser(event.target.value);
  };

  const handleDiscard = () => {
    props.setEmail(oldEmail);
    props.setUser(oldUser);
    localStorage.setItem("email", oldEmail);
    localStorage.setItem("username", oldUser);
    setOpen(false);
  };

  return (
    <div>
      <Button green onClick={handleOpen}>
        Open modal
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleDiscard}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box>
            <Form onSubmit={handleSave}>
            <Icon onClick={handleDiscard}>{icons.close}</Icon>
              <H2>Profile</H2>
              <Label>Email:</Label>
              <Input
                onChange={handleEmailChange}
                type="email"
                name="email"
                id="email"
                value={props.email}
                required
              />
              <Label>Username:</Label>
              <Input
                onChange={handleUsernameChange}
                type="text"
                name="user"
                id="user"
                value={props.user}
                required
              />
              <SubmitButton type="submit">Change</SubmitButton>
            </Form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
