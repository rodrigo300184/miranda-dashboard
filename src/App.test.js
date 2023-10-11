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
    
    render(<HeaderButton color={'red'} />);
    const button = screen.getByTestId('sidebar-button');
    expect(button).toHaveStyle("color: red");
  });
});




