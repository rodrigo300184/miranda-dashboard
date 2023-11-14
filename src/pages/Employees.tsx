import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TabsMenuContainer, TabButton } from "../components/Tabs";
import { useState } from "react";
import { EmployeesInterface } from "../features/interfaces/interfaces";
import { getEmployees, getEmployeesStatus } from "../features/employees/employeesSlice";

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
  };

  
  return (
    <>
      <TabsMenuContainer>
        <TabButton>All Employees</TabButton>
        <TabButton>Archived</TabButton>
        <TabButton>Non Archived</TabButton>
      </TabsMenuContainer>
    </>
  );
};
