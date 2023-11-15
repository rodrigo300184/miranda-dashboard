import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {IBookingsInitialState, BookingsInterface } from '../../features/interfaces/interfaces' 
import { RootState } from "../../app/store";
import { api_request } from "../../utils/delay/api_request";

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', () => {
    return api_request('bookings','GET');
})

export const fetchBooking = createAsyncThunk('bookings/fetchBooking', (id:string | undefined) => {
  return api_request(`bookings/${id}`,'GET');
})

export const createBooking = createAsyncThunk('bookings/createBooking', (newBooking:BookingsInterface) => {
  return api_request(`bookings`,'POST',newBooking);
})
export const updateBooking = createAsyncThunk('bookings/updateBooking', (updatedBooking: BookingsInterface) => {
  return api_request(`bookings/${updatedBooking._id}`,'PUT',updatedBooking);
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id:string) => {
  const result = await api_request(`bookings/${id}`,'DELETE');
  if(result === 'The booking was correctly deleted.') {return id;}
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
          state.item = {...state.item, ...action.payload.updatedBooking}
          state.data = state.data.filter((item)=> item._id !== action.payload.updatedBooking.id);
          state.item && state.data.push(state.item)
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = state.data.filter((item)=> item._id !== action.payload);
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
