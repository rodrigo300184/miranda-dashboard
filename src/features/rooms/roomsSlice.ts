import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import roomsData   from '../../data/roomsData.json';
import delay from "../../utils/delay/delay";
import {IRoomsInitialState, RoomsInterface } from '../../features/interfaces/interfaces' 
import { RootState } from "../../app/store";

export const fetchRooms = createAsyncThunk<RoomsInterface[]>('rooms/fetchRooms', async () => {
    const response = (await delay(roomsData)) as RoomsInterface[];
    return response;
})

export const fetchRoom = createAsyncThunk('rooms/fetchRoom', async (id:string | undefined) => {
    const response = (await delay(roomsData.find((room) => room.id === id))) as RoomsInterface;
    return response;
})

export const createRoom = createAsyncThunk('rooms/createRoom', async (newRoom:RoomsInterface) => {
    const response = (await delay(newRoom)) as RoomsInterface;
    return response;
})
export const updateRoom = createAsyncThunk('rooms/updateRoom', async(updatedRoom: RoomsInterface) => {
  const response = await delay(roomsData.find((room) => room.id === updatedRoom.id))
  return {response,updatedRoom};
})

export const deleteRoom = createAsyncThunk('bookings/deleteBooking', async (id:string) => {
  const response = (await delay(id)) as string;
  return response;
})



const initialState: IRoomsInitialState = {
  data: [],
  item: null,
  status: 'idle'
}


const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
      builder
        .addCase(fetchRooms.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = action.payload;
        })
        .addCase(fetchRoom.pending, (state) => {
          state.status = 'pending';
          state.item = null;
        })
        .addCase(fetchRoom.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.item = action.payload;
        })
        .addCase(fetchRoom.rejected, (state) => {
          state.status = 'rejected';
          state.item = null;
        })
        .addCase(createRoom.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = [...state.data, action.payload]
        })
        .addCase(updateRoom.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.item = {...state.item, ...action.payload.updatedRoom}
          state.data = state.data.filter((item)=> item.id !== action.payload.updatedRoom.id);
          state.item && state.data.push(state.item)
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.data = state.data.filter((item)=> item.id !== action.payload);
        })
        .addMatcher(
          isAnyOf(
            fetchRooms.pending,
            createRoom.pending,
            updateRoom.pending,
            deleteRoom.pending,
          ),
          (state) => {
            state.status = 'pending';
          }
        )
        .addMatcher(
          isAnyOf(
            fetchRooms.rejected,
            createRoom.rejected,
            updateRoom.rejected,
            deleteRoom.rejected,
          ),
          (state) => {
            state.status = 'rejected';
          }
        )
    },
  });

export default roomsSlice.reducer;
export const getRooms = (state:RootState) => state.rooms.data;
export const getRoomsStatus = (state:RootState) => state.rooms.status;
export const getRoom = (state:RootState) => state.rooms.item;
