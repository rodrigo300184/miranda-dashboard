import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TabsMenuContainer, TabButton } from "../components/Tabs";
import {
  fetchContacts,
  getContacts,
  getContactsStatus,
} from "../features/contacts/contactsSlice";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { ContactsInterface } from "../features/interfaces/interfaces";
import { Table } from "../components/Table";
import styled from "styled-components";
import colors from "../styles/colors";

const StatusContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 50px;
`;

const Select = styled.select`
  margin-top: 50px;
  width: 145px;
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

type Props = {
  color?: string;
  small?: string;
  status?: string;
  decoration?: string;
  margin?: boolean;
};

const Status = styled.button<Props>`
  font: 600 16px Poppins;
  width: 70%;
  height: 48px;
  border: none;
  border-radius: 8px;
  color: ${(props) =>
    props.status === "Archived"
      ? `${colors.checkInBtnText}`
      : `${colors.checkOutBtnText}`};

  background-color: ${(props) =>
    props.status === "Archived"
      ? `${colors.checkInBtnBgr}`
      : `${colors.checkOutBtnBgr}`};
  &:hover {
  }
`;

const TextFormatter = styled.span<Props>` 
  max-height: 120px;
  overflow: auto;
  display: block;
  text-align: center;
  margin: ${(props) => (props.margin ? "15px" : "")};
  color: ${(props) => props.color};
  font: ${(props) =>
    props.small === "small" ? "300 13px Poppins" : "500 16px Poppins"};
  text-decoration: ${(props) => props.decoration};
`;

export const Contact = () => {
  const dispatch = useAppDispatch();
  const contactsData = useAppSelector(getContacts);
  const contactsDataStatus = useAppSelector(getContactsStatus);
  const [filter, setFilter] = useState("All Contact");
  const [orderBy, setOrderBy] = useState("Newest");
  const [search, setSearch] = useState("");
  const filterOrderSearch = (
    array: ContactsInterface[],
    filter: string,
    orderBy: string,
    search: string
  ) => {
    const filteredArray = array
      .filter(
        (contact: ContactsInterface) =>
          filter === "All Contact" || contact.status === filter
      )
      .sort(
        (a: ContactsInterface, b: ContactsInterface) =>
          (orderBy === "Newest" ? 1 : -1) *
            (new Date(b.dateTime!).getTime() -
              new Date(a.dateTime!).getTime()) ||
          a.full_name.localeCompare(b.full_name)
      );

    return filteredArray.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredcontacts = useMemo(() => {
    return filterOrderSearch(contactsData, filter, orderBy, search);
  }, [contactsData, filter, orderBy, search]);

  const formattedDate = (dateTime: string) => {
    const date = new Date(dateTime);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const formatTwoDigits = (number: number) => {
      return number < 10 ? `0${number}` : `${number}`;
    };
    const formattedDate = `${days[date.getDay()]} ${
      months[date.getMonth()]
    } ${formatTwoDigits(
      date.getDate()
    )} ${date.getFullYear()} - ${formatTwoDigits(
      date.getHours()
    )}:${formatTwoDigits(date.getMinutes())}`;
    return formattedDate;
  };

  const columns = [
    {
      property: "dateTime",
      label: "Date",
      display: ({ dateTime }: ContactsInterface) => (
        <TextFormatter>{formattedDate(dateTime)}</TextFormatter>
      ),
    },
    {
      property: "full_name",
      label: "Customer",
      display: ({ full_name, email, phone_number }: ContactsInterface) => (
        <>
          <TextFormatter>{full_name}</TextFormatter>
          <TextFormatter small={"small"} color={colors.green}>
            <a href="mailto:">{email}</a>
          </TextFormatter>
          <TextFormatter small={"small"} color={colors.green}>
            <a href="tel:+">{phone_number}</a>
          </TextFormatter>
        </>
      ),
    },
    {
      property: "subject_of_review",
      label: "Subject",
      display: ({ subject_of_review }: ContactsInterface) => (
        <TextFormatter margin={true}>{subject_of_review}</TextFormatter>
      ),
    },
    {
      property: "review_body",
      label: "Comment",
      display: ({ review_body }: ContactsInterface) => (
        <TextFormatter margin={true}>{review_body}</TextFormatter>
      ),
    },
    {
      property: "status",
      label: "Status",
      display: ({ status }: ContactsInterface) => (
        <StatusContainer>
          <Status status={status}>{status}</Status>
        </StatusContainer>
      ),
    },
  ];

  return (
    <>
      <Container>
        <TabsMenuContainer>
          <TabButton
            onClick={() => {
              setFilter("All Contact");
            }}
            style={
              filter === "All Contact"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            All Contact
          </TabButton>
          <TabButton
            onClick={() => {
              setFilter("Archived");
            }}
            style={
              filter === "Archived"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            Archived
          </TabButton>
          <TabButton
            onClick={() => {
              setFilter("Not Archived");
            }}
            style={
              filter === "Not Archived"
                ? {
                    color: `${colors.hardGreen}`,
                    borderBottom: `3px solid ${colors.hardGreen}`,
                  }
                : undefined
            }
          >
            Not Archived
          </TabButton>
        </TabsMenuContainer>
        <Search onChange={(event) => setSearch(event.target.value)}></Search>
        <Select onChange={(event) => setOrderBy(event.target.value)}>
          <option value="Newest">Date(newest)</option>
          <option value="Oldest">Date(oldest)</option>
        </Select>
      </Container>
      {contactsDataStatus === "rejected" ? (
        <ErrorMessage />
      ) : contactsDataStatus === "pending" ? (
        <Spinner />
      ) : (
        <Table name="contacts" columns={columns} data={filteredcontacts} />
      )}
    </>
  );
};
