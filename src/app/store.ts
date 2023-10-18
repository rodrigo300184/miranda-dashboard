import { configureStore } from "@reduxjs/toolkit";
import bookingsSlice from "../features/bookings/bookingsSlice";

export const store = configureStore(
    {
        reducer: {
            bookings: bookingsSlice,
        }
    }
) 

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch