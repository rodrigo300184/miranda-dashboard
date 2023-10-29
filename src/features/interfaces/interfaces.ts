export interface BookingsInterface {
  id: string;
  guest: string;
  phone_number: string;
  order_date: string;
  check_in: string;
  check_out: string;
  special_request: string;
  room_type: string;
  room_number: string;
  status: string;
  photos: string[];
}

export interface IBookingsInitialState {
  data: BookingsInterface[],
  item: BookingsInterface | null,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

interface Iamenities {
  name: string,
  description: string,
}

export interface RoomsInterface {
  "id": string,
		"room_photo": string,
		"room_type": string,
		"amenities": Iamenities[],
		"price": number,
		"offer_price": boolean,
		"discount": number,
		"status": string
}

export interface IRoomsInitialState {
  data: RoomsInterface[],
  item: RoomsInterface | null,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

export interface EmployeeInterface {
  "employee_id": string,
  "full_name": string,
  "email": string,
  "photo": string,
  "start_date": string,
  "description": string,
  "phone_number": string,
  "status": string
}
