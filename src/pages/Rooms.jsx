import { TabsMenuContainer, TabButton } from "../components/Tabs";

export const Rooms = () => {
  return (
    <>
      <TabsMenuContainer>
        <TabButton>All Rooms</TabButton>
        <TabButton>Available</TabButton>
        <TabButton>Booked</TabButton>
      </TabsMenuContainer>
    </>
  );
};
