import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import bookingsData from '../../data/bookingsData.json';
import delay from "../../utils/delay/delay";

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    const response = await delay(bookingsData);
    return response;
})

export const fetchBooking = createAsyncThunk('bookings/fetchBooking', async (id) => {
    const response = await delay(bookingsData.find(id));
    return response;
})

export const createBooking = createAsyncThunk('bookings/createBooking', async (newBooking) => {
    const response = await delay(newBooking);
    return response;
})
export const updateBooking = createAsyncThunk('bookings/updateBooking', async(id) => {
  const response = await delay(bookingsData.find((booking) => booking.id === id));
  return response;
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id) => {
  const response = await delay(id);
  return response;
})


const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
      data: [],
      item: null,
      status: 'idle'
    },
    reducers: {},
    extraReducers:(builder) => {
      builder
        .addCase(fetchBookings.fulfilled, (state, action) => {
          state.data = action.payload;
          state.status = 'fulfilled';
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
        .addCase(deleteBooking.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = state.data.filter((item)=> item.id !== action.payload.id);
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
export const getBookings = (state) => state.bookings.data;
export const getBookingsStatus = (state) => state.bookings.status;
export const getBooking = (state) => state.bookings.item;
 