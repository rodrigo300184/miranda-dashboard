import styled from "styled-components";
import colors from "../styles/colors";
import {
  fetchBooking,
  getBooking,
  getBookingsStatus,
  updateBooking,
} from "../features/bookings/bookingsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { BookingsInterface } from "../features/interfaces/interfaces";

const Container = styled.div`
  margin: 50px;
  background-color: white;
  border-radius: 10px;
  padding: 40px;
`;

const Form = styled.form`
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;
const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;

const H1 = styled.h1`
  text-align: center;
  font-weight: 600;
`;

const Label = styled.label`
  font: 600 20px poppins;
  margin-right: 15px;
`;

const Input = styled.input`
  font-family: poppins;
  font-size: 16px;
  padding: 5px;
  margin-bottom: 30px;
  border: none;
  outline: none;
  border-bottom: 2px solid ${colors.bottomBorderGray};
  width: 220px;
  text-overflow: ellipsis;
`;
const TextArea = styled.textarea`
  font-family: poppins;
  font-size: 16px;
  padding: 5px;
  margin-bottom: 30px;
  //border: none;
  border-bottom: 2px solid ${colors.bottomBorderGray};
  width: 220px;
  min-height: 100px;
  text-overflow: ellipsis;
`;
const Ul = styled.ul`
  margin-top: 25px;
  text-align: right;
  list-style: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${colors.lightGreen};
  background-color: ${colors.hardGreen};
  border-radius: 8px;
  cursor: pointer;
  padding: 12px 40px;
  border: 1px solid;
  &:hover {
    color: ${colors.hardGreen};
    background-color: ${colors.lightGreen};
  }
`;

export const BookingUpdate = () => {
  const navigate = useNavigate();
  const bookingId = useParams().bookingId || "";
  const selectBooking = useAppSelector(getBooking);
  const bookingStatus = useAppSelector(getBookingsStatus);
  const [newBooking, setNewBooking] = useState<BookingsInterface | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooking(bookingId));
  }, [dispatch, bookingId]);

  useEffect(() => {
  
      setNewBooking(selectBooking);
    
  }, [selectBooking, bookingStatus]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    newBooking && setNewBooking({...newBooking, [name]: value});
  };

  const handleSubmit = () => {
    newBooking && dispatch(updateBooking(newBooking));
    navigate("/bookings");
  };
  return (
    <>
      {bookingStatus === "rejected" ? (
        <ErrorMessage />
      ) : bookingStatus === "pending" ||
        newBooking === null ||
        newBooking.id !== bookingId ? (
        <Spinner />
      ) : (
        <Container>
          <H1>Booking Update</H1>
          <Form onSubmit={handleSubmit}>
            <LeftContainer>
              <Ul>
                <li>
                  <Label>Guest Full Name:</Label>
                  <Input
                    name='guest'
                    onChange={handleInputChange}
                    type="text"
                    defaultValue={newBooking.guest}
                  ></Input>
                </li>
                <li>
                  <Label>Phone Number:</Label>
                  <Input
                    name='phone_number'
                    onChange={handleInputChange}
                    defaultValue={newBooking.phone_number}
                  ></Input>
                </li>
                <li>
                  <Label>Order Date:</Label>
                  <Input
                    name='order_date'
                    type="date"
                    onChange={handleInputChange}
                    defaultValue={newBooking.order_date}
                  ></Input>
                </li>
                <li>
                  <Label>Check In:</Label>
                  <Input
                    name='check_in'
                    type="date"
                    onChange={handleInputChange}
                    defaultValue={newBooking.check_in}
                  ></Input>
                </li>
                <li>
                  <Label>Check Out:</Label>
                  <Input
                    name='check_out'
                    type="date"
                    onChange={handleInputChange}
                    defaultValue={newBooking.check_out}
                  ></Input>
                </li>
              </Ul>
            </LeftContainer>
            <RightContainer>
              <Ul>
                <li>
                  <Label>Room Type:</Label>
                  <Input
                    name='room_type'
                    onChange={handleInputChange}
                    defaultValue={newBooking.room_type}
                  ></Input>
                </li>
                <li>
                  <Label>Room Number:</Label>
                  <Input
                    name='room_number'
                    type="text"
                    onChange={handleInputChange}
                    defaultValue={newBooking.room_number}
                  ></Input>
                </li>
                <li>
                  <Label>Status:</Label>
                  <Input
                    name='status'
                    type="text"
                    onChange={handleInputChange}
                    defaultValue={newBooking.status}
                  ></Input>
                </li>
                <li>
                  <Label>Photo:</Label>
                  <Input type="file"></Input>
                </li>
                <li>
                  <Label style={{ verticalAlign: "top" }}>
                    Special Request:
                  </Label>
                  <TextArea defaultValue={newBooking.special_request}  name='special_request' onChange={handleInputChange} />
                </li>
              </Ul>
            </RightContainer>
          </Form>
          <ButtonContainer>
            <Button onClick={handleSubmit}>Save</Button>
          </ButtonContainer>
        </Container>
      )}
    </>
  );
};
