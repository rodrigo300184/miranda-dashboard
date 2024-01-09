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
    { property: "status", label: "Status" },
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
