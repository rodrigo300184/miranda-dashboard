import { configureStore } from "@reduxjs/toolkit";
import bookingsSlice from "../features/bookings/bookingsSlice";
import roomsSlice from "../features/rooms/roomsSlice";

export const store = configureStore(
    {
        reducer: {
            bookings: bookingsSlice,
            rooms: roomsSlice,
        }
    }
) 

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch