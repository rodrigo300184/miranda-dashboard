import styled from "styled-components";
import colors from "../styles/colors";
import { fetchBooking, getBooking, getBookingsStatus } from "../features/bookings/bookingsSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";

const Container = styled.div`
  margin: 50px;
  background-color: white;
  border-radius: 10px;
  padding: 40px;
`;

const InnerContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content:center;
  width: 50%;
`;
const RightContainer = styled.div`
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
const Ul = styled.ul`
  margin-top: 25px;
  text-align: right;
  list-style: none;
`;
export const BookingUpdate = () => {
    const { bookingId } = useParams();
    const selectBooking = useSelector(getBooking);
    const bookingStatus = useSelector(getBookingsStatus);
    const [booking, setBooking] = useState({});
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchBooking(bookingId));
    }, [dispatch, bookingId]);
  
    useEffect(() => {
      if (bookingStatus === "fulfilled") {
        setBooking(selectBooking);
      }
    }, [bookingStatus, selectBooking]);

    const handleChange = (event) => {

    };

  return (
    <>
     {bookingStatus === "rejected" ? (
        <ErrorMessage />
      ) : bookingStatus === "pending" || booking===null ? (
        <Spinner />
      ) : (
      <Container>
        <H1>Booking Update</H1>
        <InnerContainer>
          <LeftContainer>
            <Ul>
              <li>
                <Label>Guest Full Name:</Label>
                <Input
                  type='text'
                  value={booking.guest}
                ></Input>
              </li>
              <li>
                <Label>Phone Number:</Label>
                <Input
                   value={booking.phone_number}
                ></Input>
              </li>
              <li>
                <Label>Order Date:</Label>
                <Input
                  type='date'
                  value={booking.order_date}
                ></Input>
              </li>
              <li>
                <Label>Check In:</Label>
                <Input
                  type='date'
                  value={booking.check_in}
                ></Input>
              </li>
              <li>
                <Label>Check Out:</Label>
                <Input
                  type='date'
                  value={booking.check_out}
                ></Input>
              </li>
            </Ul>
          </LeftContainer>
          <RightContainer></RightContainer>
        </InnerContainer>
      </Container>
      )}</>
  );
};

// "id": "2EFGH234",
// 		"guest": "Bob Johnson",
// 		"phone_number": "+1 234-567-8901",
// 		"order_date": "2023-10-02",
// 		"check_in": "2023-10-11",
// 		"check_out": "2023-10-16",
// 		"special_request": "I'd like an extra blanket.",
// 		"room_type": "Single Bed",
// 		"room_number": "101",
// 		"status": "Check In",
// 		"photos": [
