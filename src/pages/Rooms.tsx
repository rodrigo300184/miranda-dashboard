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
import PopMenu from "../components/PopMenu";
import { NavLink } from "react-router-dom";

const RoomPhoto = styled.img`
  margin: 10px 8px 5px;
  height: auto;
  width: 70%;
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
    props.small === "small" ? "300 14px Poppins" : "500 16px Poppins"};
  text-decoration: ${(props) => props.decoration};
  margin-bottom:  ${(props) =>
    props.small === "small" ? "5px" : ""};
`;

const Status = styled.button<Props>`
  font: 600 16px Poppins;
  width: 70%;
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

const AmenitiesContainer = styled.aside`
  padding: 10px 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
`;

const Amenity = styled.button<Props>`
  padding: 6px;
  //margin-bottom: 5px;
  font: 300 10px Poppins;
  width: fit-content;
  max-width: 120px;
  height: fit-content;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: ${() => `${colors.hardGreen}`};
  &:hover {
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 50px;
`;
const Select = styled.select`
  margin-top: 50px;
  width: 129px;
  height: 40px;
  font: 500 15px Poppins;
  color: ${colors.green};
  border: 2px solid rgb(19, 88, 70);
  border-radius: 12px;
  cursor: pointer;
  outline: none;
  padding-left: 15px;
`;

const Search = styled.input`
  justify-item: end;
  font: 500 16px Poppins;
  color: ${colors.green};
  padding: 5px;
  width: 220px;
  height: 40px;
  margin-top: 50px;
  border-radius: 12px;
  border: 2px solid rgb(19, 88, 70);
`;

export const Rooms = () => {
  const dispatch = useAppDispatch();
  const roomsData = useAppSelector(getRooms);
  const roomsDataStatus = useAppSelector(getRoomsStatus);
  const [filter, setFilter] = useState("All Rooms");
  const [orderBy, setOrderBy] = useState<string>('price_up');
  const filterAndOrder = (array: RoomsInterface[], filter: string, orderBy: string) => {
    const filteredArray = array.filter((room: RoomsInterface) => filter === "All Rooms" || room.status === filter);
    if (orderBy === "price_up") {
      filteredArray.sort((a: RoomsInterface, b: RoomsInterface) => 
        (a.offer_price? a.price*a.discount : a.price) - (b.offer_price? b.price*b.discount : b.price))
    } else {
      filteredArray.sort((a: RoomsInterface, b: RoomsInterface) => 
        (b.offer_price? b.price*b.discount : b.price) - (a.offer_price? a.price*a.discount : a.price))
    }
    return filteredArray;
  };

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const filteredRoomsData = useMemo(() => {
    return filterAndOrder(roomsData, filter, orderBy);
  }, [roomsData,filter,orderBy]);

  const handleDelete = (id: string): void => {
    dispatch(deleteRoom(id));
  };

  const columns = [
    {
      property: "room_info",
      label: "Room Info",
      display: ({ _id, room_number, room_photo }: RoomsInterface) => {
        return (
          <>
            <RoomPhoto src={room_photo[0]} />
            <TextFormatter>N° {room_number}</TextFormatter>
            <NavLink to={`/rooms/${_id}`}>
              <TextFormatter small={"small"} color={colors.green}>#{_id.slice(0,10)}...</TextFormatter>
            </NavLink>
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
        return (
          <>
            <AmenitiesContainer>{displayAmenities}</AmenitiesContainer>
          </>
        );
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
      display: ({ _id, status }: RoomsInterface) => {
        return (
          <>
            <Status status={status}>{status}</Status>
            <PopMenu path={"rooms"} id={_id} onClick={() => handleDelete(_id)} />
          </>
        );
      },
    },
  ];

  return (
    <>
    <Container>
      <TabsMenuContainer>
        <TabButton
          onClick={() => setFilter("All Rooms")}
          style={
            filter === "All Rooms"
              ? {
                  color: `${colors.hardGreen}`,
                  borderBottom: `3px solid ${colors.hardGreen}`,
                }
              : undefined
          }
        >
          All Rooms
        </TabButton>
        <TabButton
          onClick={() => setFilter("Available")}
          style={
            filter === "Available"
              ? {
                  color: `${colors.hardGreen}`,
                  borderBottom: `3px solid ${colors.hardGreen}`,
                }
              : undefined
          }
        >
          Available
        </TabButton>
        <TabButton
          onClick={() => setFilter("Booked")}
          style={
            filter === "Booked"
              ? {
                  color: `${colors.hardGreen}`,
                  borderBottom: `3px solid ${colors.hardGreen}`,
                }
              : undefined
          }
        >
          Booked
        </TabButton>
      </TabsMenuContainer>
      <Search></Search>
        <Select onChange={(event) => setOrderBy(event.target.value as string)}>
          <option value="price_up">Price: Up</option>
          <option value="price_down">Price: Down</option>
        </Select>
        </Container>
      {roomsDataStatus === "rejected" ? (
        <ErrorMessage />
      ) : roomsDataStatus === "pending" ? (
        <Spinner />
      ) : (
        <Table name="rooms" columns={columns} data={filteredRoomsData} />
      )}
    </>
  );
};
