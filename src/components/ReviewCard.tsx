import styled from "styled-components";
import { ContactsInterface } from "../features/interfaces/interfaces";

const CardContainer = styled.div`
  margin: 30px 0 5px 5px;
  padding: 30px;
  width: 431px;
  height: 275px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  transition: all 250ms;
  &:hover{
    transform: scale(1.025);
    transition: all 250ms;
  }
`;

const InnerCardContainer = styled.div`
  display: flex;
  gap: 21px;
  width: 100%;
  height: 275px;
`;

const Name = styled.h2`
  text-align: left;
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #262626;
`;

const Review = styled.p`
  margin-bottom: 52px;
  text-align: left;
  font: normal normal normal 16px/28px Poppins;
  letter-spacing: 0px;
  color: #4e4e4e;
  height: 107px;
  overflow: auto;
`;

const EmployeePhoto = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background-color: #c5c5c5;
  background-repeat: no-repeat;
  background-size: cover;
`;

type ReviewProps = {
  contact: ContactsInterface;
};

export const ReviewCard = (props: ReviewProps) => {
  return (
    <>
      <CardContainer>
        <Review>{props.contact.review_body}</Review>
        <InnerCardContainer>
        <EmployeePhoto
          style={{ backgroundImage: `url('https://robohash.org/${props.contact.full_name}.png')` }}
        />
          <Name>{props.contact.full_name}</Name>
        </InnerCardContainer>
      </CardContainer>
    </>
  );
};
