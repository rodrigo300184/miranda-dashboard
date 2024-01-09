import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TabsMenuContainer, TabButton } from "../components/Tabs";
import {
  deleteContact,
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
import PopMenu from "../components/PopMenu";

const StatusContainer = styled.div`
  display:flex;
`;

type Props = {
  small?: string,
  status?: string,
}

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

export const Contact = () => {
  const dispatch = useAppDispatch();
  const contactsData = useAppSelector(getContacts);
  const contactsDataStatus = useAppSelector(getContactsStatus);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const columns = [
    { property: "dateTime", label: "Date" },
    { property: "full_name", label: "Customer" },
    { property: "subject_of_review", label: "Subject" },
    { property: "review_body", label: "Comment" },
    { property: "status", label: "Status" , display: ({ status, _id }: ContactsInterface) => 
    <StatusContainer>
      <Status status={status}>{status}</Status>
    </StatusContainer>,},
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
