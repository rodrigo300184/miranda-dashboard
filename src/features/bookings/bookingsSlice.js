import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookingsData.json';
import delay from "../../utils/delay/delay";

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    const response = await delay(bookingsData);
    return response;
})

export const fetchBooking = createAsyncThunk('bookings/fetchBooking', async () => {
    const response = await delay(bookingsData);
    return response;
})

export const createBooking = createAsyncThunk('bookings/createBooking', async () => {
    const response = await delay(bookingsData);
    return response;
})

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
      bookings: [],
      booking: null,
      status: 'idle'
    },
    reducers: {},
    extraReducers:(builder) => {
      builder
        .addCase(fetchBookings.pending, (state) => {
          state.status = 'pending';
        })
        .addCase(fetchBookings.fulfilled, (state, action) => {
          state.bookings = action.payload;
          state.status = 'fulfilled';
        })
        .addCase(fetchBookings.rejected, (state) => {
          state.status = 'rejected';
        })
        .addCase(fetchBooking.pending, (state) => {
          state.isLoading = true;
          state.hasError = false;
          state.booking = null;
        })
        .addCase(fetchBooking.fulfilled, (state, action) => {
          state.isLoading = false;
          state.hasError = false;
          state.booking = action.payload;
        })
        .addCase(fetchBooking.rejected, (state) => {
          state.isLoading = false;
          state.hasError = true;
          state.booking = null;
        })
       .addCase(createBooking.pending, (state) => {
          state.isLoading = true;
          state.hasError = false;
        })
        .addCase(createBooking.fulfilled, (state, action) => {
          state.isLoading = false;
          state.hasError = false;
          state.bookings = [...state.bookings, action.payload]
        })
        .addCase(createBooking.rejected, (state) => {
          state.isLoading = false;
          state.hasError = true;
        })
    },
  });

export default bookingsSlice.reducer;
export const getBookings = (state) => state.bookings.bookings;
export const getBookingsStatus = (state) => state.bookings.status;
export const getBooking = (state) => state.bookings.booking;
 