import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TabsMenuContainer, TabButton } from "../components/Tabs";
import { RoomsInterface } from "../features/interfaces/interfaces";
import {
  getRooms,
  fetchRooms,
  getRoomsStatus,
  deleteRoom,
} from "../features/rooms/roomsSlice";
import { Table } from "../components/Table";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import styled from "styled-components";
import colors from "../styles/colors";

const RoomPhoto = styled.img`
  margin: 10px; 
  height: auto;
  width: 80%;
  border-radius: 8px;
`;

type Props = {
  small?: string,
  status?: string,
  name?: string,
  decoration?: string,
}

const TextFormatter = styled.span<Props>`
  display: block;
  text-align: left;
  color: ${(props) => props.color};
  font: ${(props) =>
    props.small === "small" ? "300 13px Poppins" : "500 16px Poppins"};
  text-decoration: ${(props) => props.decoration};
`;

export const Rooms = () => {
  const dispatch = useAppDispatch();
  const roomsData = useAppSelector(getRooms);
  const roomsDataStatus = useAppSelector(getRoomsStatus);
  const [filter, setFilter] = useState("All Rooms");
  const [orderBy, setOrderBy] = useState();

  useEffect(() => {
    filteredRoomsData.length !== 0 || dispatch(fetchRooms());
  }, [dispatch]);

  const filteredRoomsData = useMemo(() => {
    return roomsData;
  }, [roomsData]);

  const columns = [
    {
      property: "room_info",
      label: "Room Info",
      display: ({ id, room_number, room_photo }: RoomsInterface) => {
        return (
          <>
            <RoomPhoto src={room_photo[0]} />
            <TextFormatter>N° {room_number}</TextFormatter>
            <TextFormatter small={'small'} color={colors.green}>#{id}</TextFormatter>
          </>
        );
      },
    },
    {
      property: "room_type",
      label: "Room Type",
    },
    {
      property: "amenities",
      label: "Amenities",
    },
    {
      property: "price",
      label: "Price",
      display: ({price, offer_price}: RoomsInterface) => {
        return (
          <>
          {offer_price? <TextFormatter decoration={'line-through'} color={colors.red}>${price}</TextFormatter> : 
                        <TextFormatter>${price}</TextFormatter>}
          </>
        )
      }
    },
    {
      property: "offer_price",
      label: "Offer Price",
      display: ({price, offer_price, discount}: RoomsInterface) => {
        return (
          <>
          {offer_price? <TextFormatter color={colors.mattBlack}>${price-price*discount/100}</TextFormatter> : 
                        <TextFormatter>-</TextFormatter>}
          </>
        )
      }
    },
    {
      property: "status",
      label: "Status",
    },
  ];

  console.log(filteredRoomsData);

  return (
    <>
      <TabsMenuContainer>
        <TabButton>All Rooms</TabButton>
        <TabButton>Available</TabButton>
        <TabButton>Booked</TabButton>
      </TabsMenuContainer>
      {roomsDataStatus === "rejected" ? (
        <ErrorMessage />
      ) : roomsDataStatus === "pending" ? (
        <Spinner />
      ) : (
        <Table
          name="rooms"
          columns={columns}
          data={[
            {
              "room_number": "101",
              "id": "1ABCD123",
              "room_photo": [
                "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              ],
              "room_type": "Double Superior",
              "description": "Indulge in the ultimate luxury and comfort of our Double Superior room. Immerse yourself in the tranquility of this generously sized and tastefully designed space, ensuring your stay is marked by sheer relaxation and unparalleled convenience. Adorned with a contemporary and chic decor, it creates a peaceful sanctuary amidst the bustling city.",
              "amenities_type": "full",
              "amenities": 'A colocar',
              "price": 250,
              "offer_price": true,
              "discount": 10,
              "status": "Booked"
            },
          ]}
        />
      )}
    </>
  );
};
