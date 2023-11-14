import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/colors";
import PopMenu from "../components/PopMenu";
import {
  getBooking,
  getBookingsStatus,
  fetchBooking,
} from "../features/bookings/bookingsSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { BookingsInterface } from "../features/interfaces/interfaces";

const Container = styled.div`
  display: flex;
  margin: 50px;
  background-color: white;
  border-radius: 10px;
  padding: 40px;
`;

const LeftContainer = styled.div`
  width: 50%;
`;
const RightContainer = styled.div`
  width: 50%;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InnerCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 40px;
`;

const UserPhoto = styled.div`
  width: 156px;
  height: 156px;
  border-radius: 8px;
  background-color: #c5c5c5;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Name = styled.h2`
  text-align: left;
  font: normal normal 600 30px Poppins;
  letter-spacing: 0px;
  width: 100%;
  text-overflow: ellipsis;
`;

const P = styled.p`
  text-align: left;
  font: normal 14px Poppins;
  letter-spacing: 0px;
  color: ${(props) => props.color};
  margin-bottom: 15px;
  &span {
    font: normal 18px Poppins;
    color: black;
  }
`;
const ContactButtons = styled.div`
  display: flex;
  gap: 16px;
`;
const PhoneButton = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  color:  ${colors.hardGreen};
  width: 59px;
  height: 59px;
  background-color:  ${colors.phoneBtnBgr};
  border: 1px solid  ${colors.phoneBtnBgr};
  border-radius: 12px;
  transition: all 0.25s ease-in;
  cursor:pointer;
  &:hover{
    color: ${colors.phoneBtnBgr};
    background-color: ${colors.hardGreen};
`;
const MessageButton = styled.div`
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  font-size: 16px;
  font-weigth: normal;
  color:  white;
  width: 209px;
  height: 59px;
  background-color: ${colors.hardGreen};
  border: 1px solid #e8f2ef;
  border-radius: 12px;
  transition: all 0.2s ease-in;
  cursor:pointer;
  &:hover{
    color: ${colors.hardGreen};
    background-color: ${colors.phoneBtnBgr};
`;

const DatesContainer = styled.div`
  display: flex;
  border-bottom: 3px solid rgb(235, 235, 235);
  padding: 30px 0px 25px;
  gap: 15px;
`;
const DateContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

export const BookingDetails = () => {
  const  bookingId  = useParams().bookingId;
  const selectBooking = useAppSelector(getBooking);
  const bookingStatus = useAppSelector(getBookingsStatus);
  const [booking, setBooking] = useState<BookingsInterface | null>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooking(bookingId));
  }, [dispatch, bookingId]);

  useEffect(() => {
    if (bookingStatus === "fulfilled") {
      setBooking(selectBooking);
    }
  }, [bookingStatus, selectBooking]);
  
  return (
    <>
      {bookingStatus === "rejected" ? (
        <ErrorMessage />
      ) : bookingStatus === "pending" || booking===null ? (
        <Spinner />
      ) : (
        <Container>
          <LeftContainer>
            <CardContainer>
              <UserPhoto
                style={{
                  backgroundImage: `url('https://robohash.org/${booking?.guest}.png')`,
                }}
              />
              <InnerCardContainer>
                <Name>{booking?.guest}</Name>
                <P color={colors.green}>ID {booking?._id}</P>
                <ContactButtons>
                  <PhoneButton>
                    <FontAwesomeIcon icon={faPhone} size="xl" />
                  </PhoneButton>
                  <MessageButton>
                    <FontAwesomeIcon icon={faCommentDots} size="lg" />
                    <span>Send Message</span>
                  </MessageButton>
                </ContactButtons>
              </InnerCardContainer>
              <PopMenu />
            </CardContainer>
            <DatesContainer>
              <DateContainer>
                <P color={colors.gray}>Check In</P>
                <span>{booking?.check_in}</span>
              </DateContainer>
              <DateContainer>
                <P color={colors.gray}>Check Out</P>
                <span>{booking?.check_out}</span>
              </DateContainer>
            </DatesContainer>
          </LeftContainer>
          <RightContainer></RightContainer>
        </Container>
      )}
    </>
  );
};
