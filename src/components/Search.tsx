import styled from "styled-components";
import colors from "../styles/colors";

interface SearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = styled.input`
  justify-item: end;
  font: 500 16px Poppins;
  color: ${colors.green};
  padding: 5px;
  width: 220px;
  height: 40px;
  margin-top: 50px;
  border-radius: 12px;
  border: 2px solid rgb(19, 88, 70);
`;

export const Search: React.FC<SearchProps> = (props) => {
  return <SearchInput onChange={props.onChange} />;
};
