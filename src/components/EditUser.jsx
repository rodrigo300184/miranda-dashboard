import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styled from "styled-components";
import colors from "../styles/colors";

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
const Button2 = styled.button`
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    const user = document.getElementById('user').value;
    const email = document.getElementById('email').value;

    props.setUser(user);
    props.setEmail(email);
    localStorage.setItem("email", email);
    localStorage.setItem("username", user);
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
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Form onSubmit={handleSubmit}>
              <H2>Profile</H2>
              <Label>Email:</Label>
              <Input
                type="email"
                name="email"
                id="email"
                defaultValue={props.email}
                required
              />
              <Label>Username:</Label>
              <Input
                type="text"
                name="user"
                id="user"
                defaultValue={props.user}
                required
              />
              <Button2 type="submit">Change</Button2>
            </Form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
