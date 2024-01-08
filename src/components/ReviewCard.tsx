import styled from "styled-components";
import { ContactsInterface } from "../features/interfaces/interfaces";

const CardContainer = styled.div` 
  margin: 30px 0 0 0;
  padding: 30px;
  width: 431px;
  height: 275px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ebebeb;
  border-radius: 20px;
`;

const Name = styled.h2`
  text-align: left;
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #262626;
`;

const Review = styled.p`
  text-align: left;
  font: normal normal normal 16px/28px Poppins;
  letter-spacing: 0px;
  color: #4e4e4e;
`;

type ReviewProps = {
  contact: ContactsInterface;
};

export const ReviewCard = (props: ReviewProps) => {
  return (
    <>
      <CardContainer>
        <Review>{props.contact.review_body}</Review>
        <Name>{props.contact.full_name}</Name>
      </CardContainer>
    </>
  );
};
