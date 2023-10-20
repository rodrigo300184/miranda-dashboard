import { TabsMenuContainer, TabButton } from "../components/Tabs";

export const Users = () => {
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
