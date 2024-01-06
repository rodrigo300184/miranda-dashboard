import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchContacts, getContacts, getContactsStatus } from "../features/contacts/contactsSlice";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const ReviewsContainer = styled.div`
  margin: 50px;
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
  
    //   const filteredBookingsData = useMemo(() =>{return filterAndOrder(bookingsData, filter, orderBy);
    // }, [bookingsData, filter, orderBy]);
  return (
    <>
      <ReviewsContainer>
        <Title>Latest Review by Customers</Title>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={true}
          modules={[Navigation]}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
        </Swiper>
      </ReviewsContainer>
    </>
  );
};
