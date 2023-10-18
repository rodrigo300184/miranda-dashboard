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
    data: BookingsInterface[] ,
    item: BookingsInterface | null ,
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected' 
  }