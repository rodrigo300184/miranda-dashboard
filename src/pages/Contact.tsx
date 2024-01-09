import { useEffect } from "react";
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

type Props = {
  color?: string;
  small?: string;
  status?: string;
  decoration?: string;
  padding?: boolean;
};

const Status = styled.button<Props>`
  font: 600 16px Poppins;
  width: 70%;
  height: 48px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: ${(props) =>
    props.status === "Archived"
      ? `${colors.checkInBtnText}`
      : `${colors.checkOutBtnText}`};
  &:hover {
  }
`;

const TextFormatter = styled.span<Props>`
  display: block;
  text-align: center;
  padding: ${(props) => props.padding ? "15px" : ""};
  color: ${(props) => props.color};
  font: ${(props) =>
    props.small === "small" ? "300 13px Poppins" : "500 16px Poppins"};
  text-decoration: ${(props) => props.decoration};
`;

export const Contact = () => {
  const dispatch = useAppDispatch();
  const contactsData = useAppSelector(getContacts);
  const contactsDataStatus = useAppSelector(getContactsStatus);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
    { property: "subject_of_review", label: "Subject" },
    {
      property: "review_body",
      label: "Comment",
      display: ({ review_body }: ContactsInterface) => (
        <TextFormatter padding={true}>{review_body}</TextFormatter>
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
      <TabsMenuContainer>
        <TabButton>All Contact</TabButton>
        <TabButton>Archived</TabButton>
        <TabButton>Non Archived</TabButton>
      </TabsMenuContainer>
      {contactsDataStatus === "rejected" ? (
        <ErrorMessage />
      ) : contactsDataStatus === "pending" ? (
        <Spinner />
      ) : (
        <Table name="contacts" columns={columns} data={contactsData} />
      )}
    </>
  );
};
