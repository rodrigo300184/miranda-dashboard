import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookingsData.json';
import delay from "../../utils/delay/delay";
import {IBookingsInitialState, BookingsInterface } from '../../features/interfaces/interfaces' 
import { RootState } from "../../app/store";

export const fetchBookings = createAsyncThunk<BookingsInterface[]>('bookings/fetchBookings', async () => {
    const response = (await delay(bookingsData)) as BookingsInterface[];
    return response;
})

export const fetchBooking = createAsyncThunk('bookings/fetchBooking', async (id:string | undefined) => {
    const response = (await delay(bookingsData.find((booking) => booking.id === id))) as BookingsInterface;
    return response;
})

export const createBooking = createAsyncThunk('bookings/createBooking', async (newBooking:BookingsInterface) => {
    const response = (await delay(newBooking)) as BookingsInterface;
    return response;
})
export const updateBooking = createAsyncThunk('bookings/updateBooking', async(newData: {bookingId: string, newBooking: BookingsInterface}) => {
  const response = await delay(bookingsData.find((booking) => booking.id === newData.bookingId))
  return {response,newData};
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id:string) => {
  const response = (await delay(id)) as string;
  return response;
})



const initialState: IBookingsInitialState = {
  data: [],
  item: null,
  status: 'idle'
}


const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
      builder
        .addCase(fetchBookings.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = action.payload;
        })
        .addCase(fetchBooking.pending, (state) => {
          state.status = 'pending';
          state.item = null;
        })
        .addCase(fetchBooking.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.item = action.payload;
        })
        .addCase(fetchBooking.rejected, (state) => {
          state.status = 'rejected';
          state.item = null;
        })
        .addCase(createBooking.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = [...state.data, action.payload]
        })
        .addCase(updateBooking.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.item = {...state.item, ...action.payload.newData.newBooking}
          state.data = state.data.filter((item)=> item.id !== action.payload.newData.bookingId);
          state.item && state.data.push(state.item)
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = state.data.filter((item)=> item.id !== action.payload);
        })
        .addMatcher(
          isAnyOf(
            fetchBookings.pending,
            createBooking.pending,
            updateBooking.pending,
            deleteBooking.pending,
          ),
          (state) => {
            state.status = 'pending';
          }
        )
        .addMatcher(
          isAnyOf(
            fetchBookings.rejected,
            createBooking.rejected,
            updateBooking.rejected,
            deleteBooking.rejected,
          ),
          (state) => {
            state.status = 'rejected';
          }
        )
    },
  });

export default bookingsSlice.reducer;
export const getBookings = (state:RootState) => state.bookings.data;
export const getBookingsStatus = (state:RootState) => state.bookings.status;
export const getBooking = (state:RootState) => state.bookings.item;
