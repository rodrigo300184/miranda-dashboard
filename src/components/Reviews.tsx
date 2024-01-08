import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchContacts, getContacts, getContactsStatus } from "../features/contacts/contactsSlice";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { ReviewCard } from "./ReviewCard";
import { ErrorMessage } from "./ErrorMessage";
import { Spinner } from "./Spinner";

const ReviewsContainer = styled.div`
  margin: 50px;
  padding:30px;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  background: #ffffff 0% 0% no-repeat padding-box;
`;

const Title = styled.h1`
  text-align: left;
  font: 500 20px Poppins;
  letter-spacing: 0px;
  color: #393939;
  opacity: 1;
`;

export const Reviews = () => {
    const dispatch = useAppDispatch();
    const contactsData = useAppSelector(getContacts);
    const contactsDataStatus = useAppSelector(getContactsStatus);
  
    useEffect(() => {
      dispatch(fetchContacts())
    },[dispatch])
  
  return (
    <>
      <ReviewsContainer>
        <Title>Latest Review by Customers</Title>
        {contactsDataStatus === "rejected" ? (
        <ErrorMessage />
      ) : contactsDataStatus === "pending" ? (
        <Spinner />
      ) : (
        <Swiper
          spaceBetween={40}
          slidesPerView={3}
          navigation
          pagination={true}
          modules={[Navigation]}
        >{contactsData.map((contact) => {
            return (
                <>
                <SwiperSlide><ReviewCard contact={contact} /></SwiperSlide>
                </>
            )
        })}
          
          
        </Swiper>
        
      )}
        
      </ReviewsContainer>
    </>
  );
};
