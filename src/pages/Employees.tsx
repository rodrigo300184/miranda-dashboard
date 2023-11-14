import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TabsMenuContainer, TabButton } from "../components/Tabs";
import { useEffect, useMemo, useState } from "react";
import { EmployeesInterface } from "../features/interfaces/interfaces";
import {
  deleteEmployee,
  fetchEmployees,
  getEmployees,
  getEmployeesStatus,
} from "../features/employees/employeesSlice";
import colors from "../styles/colors";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import PopMenu from "../components/PopMenu";
import { ErrorMessage } from "../components/ErrorMessage";
import { Spinner } from "../components/Spinner";
import { Table } from "../components/Table";

const NameContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const EmployeePhoto = styled.img`
  margin: 5px auto;
  height: 50px;
  width: 50px;
  background: ${(props) => (props.src ? "transparent" : `${colors.green}`)};
  border-radius: 8px;
`;

const DataContainer = styled.div``;

type Props = {
  small?: string;
  status?: string;
};

const TextFormatter = styled.span<Props>`
  display: block;
  text-align: left;
  color: ${(props) =>
    props.small === "small" ? `${colors.green}` : `${colors.mattBlack}`};
  font: ${(props) =>
    props.small === "small" ? "300 13px Poppins" : "500 16px Poppins"};
`;

const StatusContainer = styled.div`
  display: flex;
`;

const Status = styled.button<Props>`
  font: 600 16px Poppins;
  width: 70%;
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

export const Employees = () => {
  const dispatch = useAppDispatch();
  const employeesData = useAppSelector(getEmployees);
  const employeesDatastatus = useAppSelector(getEmployeesStatus);
  const [filter, setFilter] = useState("All Employees");
  const [orderBy, setOrderBy] = useState<keyof EmployeesInterface>("full_name");
  const filterAndOrder = (
    array: EmployeesInterface[],
    filter: string,
    orderBy: keyof EmployeesInterface
  ) => {
    const filteredArray = array.filter(
      (booking: EmployeesInterface) =>
        filter === "All Bookings" || booking.status === filter
    );
    if (orderBy === "full_name") {
      filteredArray.sort((a: EmployeesInterface, b: EmployeesInterface) =>
        a.full_name.localeCompare(b.full_name, undefined, {
          sensitivity: "base",
        })
      );
    } else {
      filteredArray.sort((a: EmployeesInterface, b: EmployeesInterface) => {
        const dateComparison =
          new Date(a[orderBy] as string).getTime() -
          new Date(b[orderBy] as string).getTime();
        if (dateComparison === 0) {
          return a.full_name.localeCompare(b.full_name);
        }
        return dateComparison;
      });
    }
    return filteredArray;
  };

  useEffect(() => {
    dispatch(fetchEmployees);
  }, [dispatch]);

  const filteredEmployees = useMemo(() => {
    return filterAndOrder(employeesData, filter, orderBy);
  }, [employeesData, filter, orderBy]);

  const handleDelete = (id: string): void => {
    dispatch(deleteEmployee(id));
  };

  const columns = [
    {
      property: "full_name",
      label: "Name",
      display: ({ full_name, photo, _id }: EmployeesInterface) => (
        <>
          <NameContainer>
            <EmployeePhoto src={photo} />
            <DataContainer>
              <TextFormatter>{full_name}</TextFormatter>
              <TextFormatter small="small">{_id}</TextFormatter>
            </DataContainer>
          </NameContainer>
        </>
      ),
    },
    {
      property: "contact_info",
      label: "Contact Information",
      display: ({ _id, email, phone_number }: EmployeesInterface) => (
        <>
          <TextFormatter small="small">
            <FontAwesomeIcon icon={faPhone} style={{ color: "#799283" }} />{" "}
            {phone_number}
          </TextFormatter>
          <TextFormatter small="small">{email}</TextFormatter>
          <TextFormatter small="small">{_id}</TextFormatter>
        </>
      ),
    },
    {
      property: "start_date",
      label: "Start Date",
    },
    {
      property: "description",
      label: "Job Description",
    },
    {
      property: "status",
      label: "Status",
      display: ({ status, _id }: EmployeesInterface) => (
        <StatusContainer>
          <Status status={status}>{status}</Status>
          <PopMenu
            path={"employees"}
            id={_id}
            onClick={() => handleDelete(_id)}
          />
        </StatusContainer>
      ),
    },
  ];

  return (
    <>
      <TabsMenuContainer>
        <TabButton>All Employees</TabButton>
        <TabButton>Archived</TabButton>
        <TabButton>Non Archived</TabButton>
      </TabsMenuContainer>
      {employeesDatastatus === "rejected" ? (
        <ErrorMessage />
      ) : employeesDatastatus === "pending" ? (
        <Spinner />
      ) : (
        <Table name="employees" columns={columns} data={filteredEmployees} />
      )}
    </>
  );
};
