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
  display: block;
  text-align: center;
  padding: ${(props) => (props.padding ? "15px" : "")};
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
  const filterAndOrder = (
    array: ContactsInterface[],
    filter: string,
    orderBy: string
  ) => {
    const filteredArray = array.filter(
      (contact: ContactsInterface) =>
        filter === "All Contact" || contact.status === filter
    );
    if (orderBy === "Newest") {
      filteredArray.sort((a: ContactsInterface, b: ContactsInterface) => {
        const dateComparison =
          new Date(b.dateTime as string).getTime() -
          new Date(a.dateTime as string).getTime();
        if (dateComparison === 0) {
          return a.full_name.localeCompare(b.full_name);
        }
        return dateComparison;
      });
    } else {
      filteredArray.sort((a: ContactsInterface, b: ContactsInterface) => {
        const dateComparison =
          new Date(a.dateTime as string).getTime() -
          new Date(b.dateTime as string).getTime();
        if (dateComparison === 0) {
          return a.full_name.localeCompare(b.full_name);
        }
        return dateComparison;
      });
    }
    return filteredArray;
  };
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredcontacts = useMemo(() => {
    return filterAndOrder(contactsData, filter, orderBy);
  }, [contactsData, filter, orderBy]);

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
        <TextFormatter padding={true}>{subject_of_review}</TextFormatter>
      ),
    },
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
