import { TabsMenuContainer, TabButton } from "../components/Tabs";
import bookings from '../data/bookings.json';
import { Table } from "../components/Table";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const TextFormatter = styled.span`
	display: block;
	text-align: left;
	color: ${(props) => (props.small === 'small' ? '#799283' : '#393939')};
	font: ${(props) =>
		props.small === 'small' ? '300 13px Poppins' : '500 16px Poppins'};
`;
const Status = styled.button`
	font: 600 16px Poppins;
	width: 80%;
	max-width:120px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: ${(props) =>
		props.status === 'CheckIn'
			? '#5AD07A'
			: props.status === 'CheckOut'
			? '#E23428'
			: props.status === 'In Progress'
			? '#fff'
			: 'transparent'};
	background-color: ${(props) =>
		props.status === 'CheckIn'
			? '#E8FFEE'
			: props.status === 'CheckOut'
			? '#FFEDEC'
			: props.status === 'In Progress'
			? '#FF9C3A'
			: 'transparent'};
	&:hover {
	}
	`;
const SpecialRequest = styled.button`
	font: 400 16px Poppins;
	width: 80%;
	max-width:120px;
	height: 48px;
	border: none;
	border-radius: 8px;
	color: ${(props) => (props.specialrequest >= 1 ? '#799283' : '#212121')};
	background-color: ${(props) =>
		props.specialrequest >= 1 ? '#fff' : '#EEF9F2'};
	border: ${(props) => props.specialrequest >= 1 && '1px solid #799283'};
`;

const CustomerPhoto = styled.img`
	margin: 10px 10px 18px 18px;
	height: 40px;
	width: 40px;
	background: ${(props) => (props.src ? 'transparent' : '#7992832e')};
	border-radius: 8px;
`;

export const Bookings = () => {
	const whoAmI = {
		name: 'bookings',
	}
	const columns = [
		{
			property: 'guest',
			label: 'Guest Details',
			display: ({ guest, phone_number, id }) => (
				<>
					<CustomerPhoto
						src={`https://robohash.org/${guest}.png?set=any`}
					/>
					<TextFormatter name='name'>{guest}</TextFormatter>
					<TextFormatter small='small'>{phone_number}</TextFormatter>
					<NavLink to={`/bookings/${id}`}><TextFormatter small='small'>#{id}</TextFormatter></NavLink>
				</>
			),
		},
		{
			property: 'order_date',
			label: 'Order Date',
		},
		{
			property: 'check_in',
			label: 'Check In',
		},
		{
			property: 'check_out',
			label: 'Check Out',
		},
		{
			property: 'special_request',
			label: 'Special Request',
			display: ({ special_request }) => (
				<SpecialRequest
					onClick={() => {
						console.log('im here')
					}}
					specialrequest={special_request.length}
				>
					View Notes
				</SpecialRequest>
			),
		},
		{
			property: 'room_type',
			label: 'Room Type',
		},
		{
			property: 'status',
			label: 'Status',
			display: ({ status }) => <Status status={status}>{status}</Status>,
		},
	]

  return (
    <>
      <TabsMenuContainer>
        <TabButton>All Guest</TabButton>
        <TabButton>Check In</TabButton>
        <TabButton>Check Out</TabButton>
        <TabButton>In Progress</TabButton>
      </TabsMenuContainer>
      <Table whoAmI={whoAmI} columns={columns} data={bookings} />
    </>
  );
};
