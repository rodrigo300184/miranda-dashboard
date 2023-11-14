import { configureStore } from "@reduxjs/toolkit";
import bookingsSlice from "../features/bookings/bookingsSlice";
import roomsSlice from "../features/rooms/roomsSlice";
import loginSlice from "../features/login/loginSlice";


export const store = configureStore(
    {
        reducer: {
            bookings: bookingsSlice,
            rooms: roomsSlice,
            login: loginSlice,
        }
    }
) 

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch