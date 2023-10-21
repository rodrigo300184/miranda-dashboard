import styled from "styled-components";
import colors from "../styles/colors";
import {
  fetchBooking,
  getBooking,
  getBookingsStatus,
  updateBooking,
} from "../features/bookings/bookingsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
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
  const [newGuestName, setNewGuestName] = useState<string>("");
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>("");
  const [newOrderDate, setNewOrderDate] = useState<string>("");
  const [newCheckIn, setNewCheckIn] = useState<string>("");
  const [newCheckOut, setNewCheckOut] = useState<string>("");
  const [newRoomType, setNewRoomType] = useState<string>("");
  const [newRoomNumber, setNewRoomNumber] = useState<string>("");
  const [newStatus, setNewStatus] = useState<string>("");
  const [newSpecialRequest, setNewSpecialRequest] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooking(bookingId));
  }, [dispatch, bookingId]);

  const booking = useMemo(() => {
    return selectBooking;
  }, [selectBooking]);

  const handleSubmit = () => {
    const newBooking: BookingsInterface = {
      id: bookingId,
      guest: newGuestName || booking?.guest || '',
      phone_number: newPhoneNumber || booking?.phone_number ||'',
      order_date: newOrderDate || booking?.order_date ||'',
      check_in: newCheckIn || booking?.check_in || '',
      check_out: newCheckOut || booking?.check_out || '',
      special_request: newSpecialRequest || booking?.special_request || '',
      room_type: newRoomType || booking?.room_type || '',
      room_number: newRoomNumber || booking?.room_number || '',
      status: newStatus || booking?.status || '',
      photos: booking?.photos || []
    };
    dispatch(updateBooking({ bookingId, newBooking }));
    navigate("/bookings");
  };
  return (
    <>
      {bookingStatus === "rejected" ? (
        <ErrorMessage />
      ) : bookingStatus === "pending" ||
        booking === null ||
        booking.id !== bookingId ? (
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
                    onChange={(e) => setNewGuestName(e.target.value)}
                    type="text"
                    defaultValue={booking.guest}
                  ></Input>
                </li>
                <li>
                  <Label>Phone Number:</Label>
                  <Input
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    defaultValue={booking.phone_number}
                  ></Input>
                </li>
                <li>
                  <Label>Order Date:</Label>
                  <Input
                    type="date"
                    onChange={(e) => setNewOrderDate(e.target.value)}
                    defaultValue={booking.order_date}
                  ></Input>
                </li>
                <li>
                  <Label>Check In:</Label>
                  <Input
                    type="date"
                    onChange={(e) => setNewCheckIn(e.target.value)}
                    defaultValue={booking.check_in}
                  ></Input>
                </li>
                <li>
                  <Label>Check Out:</Label>
                  <Input
                    type="date"
                    onChange={(e) => setNewCheckOut(e.target.value)}
                    defaultValue={booking.check_out}
                  ></Input>
                </li>
              </Ul>
            </LeftContainer>
            <RightContainer>
              <Ul>
                <li>
                  <Label>Room Type:</Label>
                  <Input
                    onChange={(e) => setNewRoomType(e.target.value)}
                    defaultValue={booking.room_type}
                  ></Input>
                </li>
                <li>
                  <Label>Room Number:</Label>
                  <Input
                    type="text"
                    onChange={(e) => setNewRoomNumber(e.target.value)}
                    defaultValue={booking.room_number}
                  ></Input>
                </li>
                <li>
                  <Label>Status:</Label>
                  <Input
                    type="text"
                    onChange={(e) => setNewStatus(e.target.value)}
                    defaultValue={booking.status}
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
                  <TextArea
                    onChange={(e) => setNewSpecialRequest(e.target.value)}
                    defaultValue={booking.special_request}
                  />
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
