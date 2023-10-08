import styled from "styled-components";
import colors from "../styles/colors";
import { TabsMenuContainer, TabButton } from "../components/Tabs";
import { Table } from "../components/Table";
import { NavLink } from "react-router-dom";
import {
  getBookings,
  fetchBookings,
  getBookingsStatus,
} from "../features/bookings/bookingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import { ErrorMessage } from "../components/ErrorMessage";
import ViewNotes from "../components/ViewNotes";

const TextFormatter = styled.span`
  display: block;
  text-align: left;
  color: ${(props) =>
    props.small === "small" ? `${colors.green}` : `${colors.mattBlack}`};
  font: ${(props) =>
    props.small === "small" ? "300 13px Poppins" : "500 16px Poppins"};
`;

const Status = styled.button`
  font: 600 16px Poppins;
  width: 80%;
  max-width: 120px;
  height: 48px;
  border: none;
  border-radius: 8px;
  color: ${(props) =>
    props.status === "Check In"
      ? `${colors.checkInBtnText}`
      : props.status === "Check Out"
      ? `${colors.checkOutBtnText}`
      : props.status === "In Progress"
      ? `${colors.inProgressBtnText}`
      : "transparent"};
  background-color: ${(props) =>
    props.status === "Check In"
      ? `${colors.checkInBtnBgr}`
      : props.status === "Check Out"
      ? `${colors.checkOutBtnBgr}`
      : props.status === "In Progress"
      ? `${colors.inProgressBtnBgr}`
      : "transparent"};
  &:hover {
  }
`;

const CustomerPhoto = styled.img`
  margin: 10px 10px 18px 18px;
  height: 40px;
  width: 40px;
  background: ${(props) => (props.src ? "transparent" : `${colors.green}`)};
  border-radius: 8px;
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
  font: 500 16px Poppins;
  color: ${colors.green};
  border: 2px solid rgb(19, 88, 70);
  border-radius: 12px;
  cursor: pointer;
  outline: none;
  padding-left: 15px;
`;


const Search = styled.input`
  font: 500 16px Poppins;
  color: ${colors.green};
  padding: 5px;
  width: 220px;
  height: 40px;
  margin-top: 50px;
  border-radius: 12px;
  border: 2px solid rgb(19, 88, 70);
`;

export const Bookings = () => {
  const dispatch = useDispatch();
  const bookingsData = useSelector(getBookings);
  const bookingsDataStatus = useSelector(getBookingsStatus);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("All Bookings");
  const [orderBy, setOrderBy] = useState(["guest", true]);
  const filterAndOrder = (array, filter, orderBy) => {
    const filteredArray = array.filter((booking) => {
      if (filter === "All Bookings") {
        return true;
      } else {
        return booking.status === filter;
      }
    });
    if (orderBy === "guest") {
      filteredArray.sort((a, b) =>
        a.guest.localeCompare(b.guest, undefined, { sensitivity: "base" })
      );
    } else {
      filteredArray.sort((a, b) => {
        const dateComparison = new Date(a[orderBy]) - new Date(b[orderBy]);
        if (dateComparison === 0) {
          return a.guest.localeCompare(b.guest);
        }
        return dateComparison;
      });
    }
    return filteredArray;
  };

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  useEffect(() => {
    const filteredBookingsData = filterAndOrder(bookingsData, filter, orderBy);
    setFilteredData(filteredBookingsData);
  }, [bookingsData, filter, orderBy]);

  const columns = [
    {
      property: "guest",
      label: "Guest Details",
      display: ({ guest, phone_number, id }) => (
        <>
          <CustomerPhoto src={`https://robohash.org/${guest}.png?set=any`} />
          <TextFormatter name="name">{guest}</TextFormatter>
          <TextFormatter small="small">{phone_number}</TextFormatter>
          <NavLink to={`/bookings/${id}`}>
            <TextFormatter small="small">#{id}</TextFormatter>
          </NavLink>
        </>
      ),
    },
    {
      property: "order_date",
      label: "Order Date",
    },
    {
      property: "check_in",
      label: "Check In",
    },
    {
      property: "check_out",
      label: "Check Out",
    },
    {
      property: "special_request",
      label: "Special Request",
      display: ({ special_request }) => (
        <ViewNotes specialrequest={special_request.length} message={special_request} />
      ),
    },
    {
      property: "room_type",
      label: "Room Type",
    },
    {
      property: "status",
      label: "Status",
      display: ({ status }) => <Status status={status}>{status}</Status>,
    },
  ];

  return (
    <>
      <Container>
        <TabsMenuContainer>
          <TabButton
            onClick={() => setFilter("All Bookings")}
            style={
              filter === "All Bookings"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : null
            }
          >
            All Bookings
          </TabButton>
          <TabButton
            onClick={() => setFilter("Check In")}
            style={
              filter === "Check In"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : null
            }
          >
            Check In
          </TabButton>
          <TabButton
            onClick={() => setFilter("Check Out")}
            style={
              filter === "Check Out"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : null
            }
          >
            Check Out
          </TabButton>
          <TabButton
            onClick={() => setFilter("In Progress")}
            style={
              filter === "In Progress"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : null
            }
          >
            In Progress
          </TabButton>
        </TabsMenuContainer>
        <Search></Search>
        <Select onChange={(event) => setOrderBy(event.target.value)}>
          <option value="guest">Guest</option>
          <option value="order_date">Order Date</option>
          <option value="check_in">Check In</option>
          <option value="check_out">Check Out</option>
        </Select>
      </Container>

      {bookingsDataStatus === "rejected" ? (
        <ErrorMessage />
      ) : bookingsDataStatus === "pending" ? (
        <Spinner />
      ) : (
        <Table name="bookings" columns={columns} data={filteredData} />
      )}
    </>
  );
};
