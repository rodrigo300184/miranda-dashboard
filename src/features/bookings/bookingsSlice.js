import { createSlice } from "@reduxjs/toolkit";

const bookingsSlice = createSlice({
    name: "bookingsList",
    initialState: {
      bookings: [],
      booking: null,
      isLoading: false,
      hasError: false,
    },
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchBookings.pending, (state) => {
          state.isLaoding = true;
          state.hasError = false;
        })
        .addCase(fetchBookings.fulfilled, (state, action) => {
          state.isLoading = false;
          state.hasError = false;
          state.bookings = action.payload;
        })
        .addCase(fetchBookings.rejected, (state) => {
          state.isLoading = false;
          state.hasError = true;
        })
        .addCase(fetchBooking.pending, (state) => {
          state.isLaoding = true;
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
          state.isLaoding = true;
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
// export const { addPhoto, removePhoto, editDescription } = favoriteSlice.actions;
// export const getFavPhotosStatus = (state) => state.favoritePhotos.status;
// export const getFavPhotos = (state) => state.favoritePhotos.favorites;
// export const getFavLength = (state) => state.favoritePhotos.favorites.length; 