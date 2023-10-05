import styled from "styled-components";
import colors from "../styles/colors";

const TableContainer = styled.div`
  padding: 0px 50px;
  margin-bottom: 30px;
  height: 690px;
  overflow:hidden;
`;

const TableHeaderContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-around;
  align-items: center;
  height: 65px;
  border-radius: 20px 20px 0px 0px;
  font-size: 16px;
  color: black;
  font-weight: 600;
  background-color: white;
  & div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

const TableContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  text-align: center;
  width: 100%;
  max-height: 100%;
  border: 1px solid ${colors.borderGray};
  border-radius: 0 0 20px 20px ;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
    background-color: #ebf1ef;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 6px rgba(235, 241, 239, 0.3);
    background-color: rgba(102, 51, 153, 0.153);
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(235, 241, 239, 0.3);
    border-radius: 2px;
    background-color: rgba(235, 241, 239, 0.612);
  }
  p {
    text-align: center;
    color: black;
    font-size: 16px;
    font-weight: 300;
  }
  & div {
    width: 100%;
    height: 100%;
  }
`;

const RowContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${colors.borderGray};
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${colors.borderGray};
    width: 100%;
    height: 135px;
    &:first-child{
      border: none;
    }
  }
  &:last-child{
    border:none;
  }
  &:hover{
    box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 170px;
  }
  
`;

export const Table = (props) => {
  const { columns, data } = props;

  const displayRow = (row, index) => {
    const rowContent = (
      <>
        {props.columns.map((col, i) => (
          <div key={i}>
            
            
              {typeof col.display === "function"
                ? col.display(row)
                : row[col.property]}
            
          </div>
        ))}
      </>
    );
    const key = `${props.whoAmI.name}-${row.id}-${index}`;
    
      return (
        <RowContainer key={key}>
          {rowContent}
        </RowContainer>
      );
    
  };

  return (
    <>
      <TableContainer>
        <TableHeaderContainer>
          {columns.map((col) => (
            <div>
              <p>{col.label}</p>
            </div>
          ))}
        </TableHeaderContainer>
        <TableContent>
          {data.map((bookingRowObject,index) => displayRow(bookingRowObject, index))}
        </TableContent>
      </TableContainer>
    </>
  );
};
