import { TabsMenuContainer, TabButton } from "../components/Tabs";

export const Contact = () => {
  return (
    <>
      <TabsMenuContainer>
        <TabButton>All Contact</TabButton>
        <TabButton>Archived</TabButton>
        <TabButton>Non Archived</TabButton>
      </TabsMenuContainer>
    </>
  );
};
