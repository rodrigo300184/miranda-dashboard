import styled from "styled-components";
import colors from "../styles/colors";


const H1 = styled.h1`
margin-top:150px;
  text-align: center;
  color: ${colors.green};
`;
const H3 = styled.h3`
  text-align: center;
  color: ${colors.mattBlack};
`;

export const RoomDetails = () => {

    return (
        <>
        <H1>Hello Room Details</H1>
        <H3>I'm still working on it</H3>
        </>
    )
}