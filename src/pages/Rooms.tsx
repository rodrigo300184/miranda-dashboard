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
  small?: string;
  status?: string;
  name?: string;
  decoration?: string;
};

const TextFormatter = styled.span<Props>`
  display: block;
  text-align: left;
  color: ${(props) => props.color};
  font: ${(props) =>
    props.small === "small" ? "300 13px Poppins" : "500 16px Poppins"};
  text-decoration: ${(props) => props.decoration};
`;

const Status = styled.button<Props>`
  font: 600 16px Poppins;
  width: 70%;
  max-width: 120px;
  height: 48px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: ${(props) =>
    props.status === "Available"
      ? `${colors.checkInBtnText}`
      : `${colors.checkOutBtnText}`};
  &:hover {
  }
`;

const AmenitiesContainer = styled.section`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
 
`;

const Amenity = styled.button<Props>`
  padding: 7px;
 //margin-bottom: 5px;
  font: 300 10px Poppins;
  width: fit-content;
  max-width: 120px;
  height: fit-content;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: ${ () => `${colors.hardGreen}`};
  &:hover {
  }
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
            <TextFormatter small={"small"} color={colors.green}>
              #{id}
            </TextFormatter>
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
      display: ({ amenities }: RoomsInterface) => {
        const displayAmenities = amenities.map((amenity, key) => {
          return <Amenity key={key}>{amenity.name}</Amenity>;
        });
        return <><AmenitiesContainer>{displayAmenities}</AmenitiesContainer></>
      },
    },
    {
      property: "price",
      label: "Price",
      display: ({ price, offer_price }: RoomsInterface) => {
        return (
          <>
            {offer_price ? (
              <TextFormatter decoration={"line-through"} color={colors.red}>
                ${price}
              </TextFormatter>
            ) : (
              <TextFormatter>${price}</TextFormatter>
            )}
          </>
        );
      },
    },
    {
      property: "offer_price",
      label: "Offer Price",
      display: ({ price, offer_price, discount }: RoomsInterface) => {
        return (
          <>
            {offer_price ? (
              <TextFormatter color={colors.mattBlack}>
                ${price - (price * discount) / 100}
              </TextFormatter>
            ) : (
              <TextFormatter>-</TextFormatter>
            )}
          </>
        );
      },
    },
    {
      property: "status",
      label: "Status",
      display: ({ status }: RoomsInterface) => {
        return <Status status={status}>{status}</Status>;
      },
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
          data={filteredRoomsData}
        />
      )}
    </>
  );
};
