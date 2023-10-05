
import colors from "../styles/colors";
import styled from "styled-components";

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px ;
  color: ${colors.hardGreen};
  & h4{
    color: ${colors.green};
  }
`;

export const ErrorMessage = () => {
  return (
    <>
      <ErrorMessageContainer>
        <h1>Oops! something went wrong.</h1>
        <h4>Try again later!</h4>
      </ErrorMessageContainer>
    </>
  );
};