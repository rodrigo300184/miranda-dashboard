import { cleanup, render, screen } from "@testing-library/react";
import { HeaderButton } from "./components/HeaderButton";


describe("test", () => {
  render(
    <HeaderButton />);

  test("renders learn react link", () => {
    const linkElemen = screen.getByTestId('sidebar-button');
    expect(linkElemen).toBeInTheDocument();
  });

  test("renders learn react link", () => {
   const props = {
      color: 'red',
    }
    
    render(<HeaderButton {...props}/>);
    const button = screen.getByTestId('sidebar-button');
    expect(button).toHaveStyle("color: red");
  });
});




