import styled from "styled-components";
import colors from "../styles/colors";
import {
  getRoomsStatus,
  getRoom,
  updateRoom,
  fetchRoom,
} from "../features/rooms/roomsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Iamenities, RoomsInterface } from "../features/interfaces/interfaces";
import { useState, useEffect } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";

const Container = styled.div`
  margin: 50px;
  background-color: white;
  border-radius: 10px;
  padding: 40px;
`;

const Form = styled.form`
  display: flex;
  margin-bottom: 30px;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;
const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;

const H1 = styled.h1`
  text-align: center;
  font-weight: 600;
`;

const Label = styled.label`
  font: 600 20px poppins;
  margin-right: 15px;
  & span {
    font-size: 12px;
    vertical-align: sub;
  }
`;

const Input = styled.input`
  font-family: poppins;
  font-size: 16px;
  padding: 5px;
  margin-bottom: 30px;
  border: none;
  outline: none;
  border-bottom: 2px solid ${colors.bottomBorderGray};
  width: 220px;
  text-overflow: ellipsis;
`;
const TextArea = styled.textarea`
  font-family: poppins;
  font-size: 13px;
  padding: 5px;
  margin-bottom: 20px;
  border-bottom: 2px solid ${colors.bottomBorderGray};
  width: 300px;
  height: 250px;
  resize: none;
  text-overflow: ellipsis;
`;
const Ul = styled.ul`
  margin-top: 25px;
  text-align: right;
  list-style: none;
  & li {
    display: flex;
    justify-content: end;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${colors.lightGreen};
  background-color: ${colors.hardGreen};
  border-radius: 8px;
  cursor: pointer;
  padding: 12px 40px;
  border: 1px solid;
  &:hover {
    color: ${colors.hardGreen};
    background-color: ${colors.lightGreen};
  }
`;

const Select = styled.select`
  border: none;
  outline: none;
  border-bottom: 2px solid ${colors.bottomBorderGray};
  width: 220px;
  font-family: poppins;
  font-size: 16px;
  margin-bottom: 30px;
`;

const ChoicesContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 30px;
  & div {
    display: flex;
    width: 220px;
    & label {
      margin-left: 4px;
      margin-right: 15px;
    }
  }
`;

type Props = {
  active?: boolean;
};

const Amenity = styled.div<Props>`
  cursor: pointer;
  padding: 6px;
  font: 300 10px Poppins;
  width: fit-content;
  max-width: 120px;
  height: fit-content;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: ${(props) =>
    props.active ? `${colors.hardGreen}` : `${colors.borderGray}`};
  &:hover {
  }
`;
const AmenitiesContainer = styled.aside`
  padding: 10px 5px;
  width: 220px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 5px;
  margin-bottom: 30px;
`;

const PhotoInput = styled.input`
  text-overflow: ellipsis;
  font-family: poppins;
  font-size: 16px;
  padding: 5px;
  gap: 5px;
  border: none;
  outline: none;
  border-bottom: 2px solid ${colors.bottomBorderGray};
`;

export const RoomUpdate = () => {
  const navigate = useNavigate();
  const roomId = useParams().roomId || "";
  const selectRoom = useAppSelector(getRoom);
  const roomsStatus = useAppSelector(getRoomsStatus);
  const [newRoom, setNewRoom] = useState<RoomsInterface | null>(null);
  const dispatch = useAppDispatch();
  const [sliderValue, setSliderValue] = useState<number>();
  const availableTypeRoom = [
    "(Select from the list)",
    "Single Bed",
    "Double Bed",
    "Double Superior",
    "Suite",
  ];
  const availableAmenities: Iamenities[] = [
    { name: "1/3 Bed Space", description: "Spacious bed area" },
    {
      name: "24-Hour Guard",
      description: "Security available around the clock",
    },
    { name: "Free Wifi", description: "High-speed internet access" },
    { name: "Air Conditioner", description: "Climate control" },
    { name: "Television", description: "Flat-screen TV" },
    { name: "Towels", description: "Fresh towels provided" },
    { name: "Mini Bar", description: "Mini bar with refreshments" },
    { name: "Coffee Set", description: "Coffee and tea making facilities" },
    { name: "Nice Views", description: "Scenic views from the room" },
    { name: "1/2 Bathroom", description: "Private half bathroom" },
  ];

  useEffect(() => {
    dispatch(fetchRoom(roomId));
  }, [dispatch, roomId]);

  useEffect(() => {
    setNewRoom(selectRoom);
  }, [selectRoom, roomsStatus]);

  const toggleAmenity = (amenity: Iamenities) => {
    if (newRoom) {
      const copyOfData = structuredClone(newRoom);
      const index = copyOfData.amenities.findIndex(
        (item) => item.name === amenity.name
      );
      if (index === -1) {
        copyOfData.amenities.push(amenity);
      } else {
        copyOfData.amenities.splice(index, 1);
      }
      setNewRoom(copyOfData);
    }
  };

  function handlePhotosQuantity(action: string) {
    if (newRoom) {
      const copyOfData = structuredClone(newRoom);
      if (action === "add" && copyOfData.room_photo.length < 4) {
        copyOfData.room_photo.push("");
      } else if (action === "remove" && copyOfData.room_photo.length > 1) {
        copyOfData.room_photo.pop();
      }
      setNewRoom(copyOfData);
    }
  }

  const handleInputChange = (event: React.BaseSyntheticEvent, key?: number) => {
    const { name, value } = event.target;
    if (name === "room_photo" && key !== undefined) {
      newRoom &&
        setNewRoom({
          ...newRoom,
          [name]: [
            ...newRoom.room_photo.slice(0, key),
            value,
            ...newRoom.room_photo.slice(key + 1),
          ],
        });
    } else {
      newRoom && setNewRoom({ ...newRoom, [name]: value });
    }
  };

  const handleSubmit = () => {
    newRoom && dispatch(updateRoom(newRoom));
    navigate("/rooms");
  };

  return (
    <>
      {roomsStatus === "rejected" ? (
        <ErrorMessage />
      ) : roomsStatus === "pending" ||
        newRoom === null ||
        newRoom._id !== roomId ? (
        <Spinner />
      ) : (
        <Container>
          <H1>Room Update</H1>
          <Form onSubmit={handleSubmit}>
            <LeftContainer>
              <Ul>
                <li>
                  <Label>Room Type:</Label>
                  <Select
                    name="room_type"
                    onChange={handleInputChange}
                    defaultValue={newRoom.room_type}
                  >
                    {availableTypeRoom.map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={index === 0 ? "" : availableTypeRoom[index]}
                          hidden={index === 0}
                        >
                          {item}
                        </option>
                      );
                    })}
                  </Select>
                </li>
                <li>
                  <Label>Room Number:</Label>
                  <Input
                    name="room_number"
                    onChange={handleInputChange}
                    defaultValue={newRoom.room_number}
                  ></Input>
                </li>
                <li>
                  <Label>Price:</Label>
                  <Input
                    name="price"
                    type="text"
                    onChange={handleInputChange}
                    defaultValue={newRoom.price}
                  ></Input>
                </li>
                <li>
                  <ChoicesContainer>
                    <Label>Discount:</Label>
                    <div>
                      <input
                        onChange={handleInputChange}
                        checked={newRoom.offer_price}
                        type="radio"
                        name="yes"
                        value="Yes"
                      />
                      <label htmlFor="yes">Yes</label>
                      <input
                        onChange={handleInputChange}
                        checked={!newRoom.offer_price}
                        type="radio"
                        name="no"
                        value="No"
                      />
                      <label htmlFor="no">No</label>
                    </div>
                  </ChoicesContainer>
                </li>
                <li>
                  <ChoicesContainer>
                    <Label>Discount percentage:</Label>
                    <div>
                      <input
                        onChange={(e) =>
                          setSliderValue(parseInt(e.target.value))
                        }
                        name="slider"
                        type="range"
                        min="1"
                        max="50"
                        defaultValue={newRoom?.discount || 0}
                        disabled={!newRoom.offer_price}
                      />
                      <label htmlFor="slider">
                        {sliderValue || newRoom?.discount}%
                      </label>
                    </div>
                  </ChoicesContainer>
                </li>
                <li>
                  <Label>Amenities:</Label>
                  <AmenitiesContainer>
                    {availableAmenities.map((amenity, key) => {
                      return (
                        <Amenity
                          active={
                            newRoom.amenities.find(
                              (item) => item.name === amenity.name
                            )
                              ? true
                              : false
                          }
                          key={key}
                          onClick={() => toggleAmenity(amenity)}
                        >
                          {amenity.name}
                        </Amenity>
                      );
                    })}
                  </AmenitiesContainer>
                </li>
              </Ul>
            </LeftContainer>
            <RightContainer>
              <Ul>
                <li>
                  <Label>Photo:</Label>
                  <PhotoContainer>
                    {newRoom.room_photo.map((photo, key) => {
                      return (
                        <PhotoInput
                          name="room_photo"
                          onChange={(event) => handleInputChange(event, key)}
                          key={key}
                          defaultValue={photo}
                        />
                      );
                    })}
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handlePhotosQuantity("add");
                      }}
                    >
                      +
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handlePhotosQuantity("remove");
                      }}
                    >
                      -
                    </Button>
                  </PhotoContainer>
                </li>
                <li>
                  <Label style={{ verticalAlign: "top" }}>Description:</Label>
                  <TextArea
                    defaultValue={newRoom.description}
                    name="description"
                    onChange={handleInputChange}
                  />
                </li>
              </Ul>
            </RightContainer>
          </Form>
          <ButtonContainer>
            <Button onClick={handleSubmit}>Save</Button>
          </ButtonContainer>
        </Container>
      )}
    </>
  );
};
