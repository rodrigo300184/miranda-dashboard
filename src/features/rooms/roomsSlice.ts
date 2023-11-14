import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IRoomsInitialState, RoomsInterface } from '../../features/interfaces/interfaces'
import { RootState } from "../../app/store";
import { api_request } from "../../utils/delay/api_request";

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', () => {
  return api_request('rooms','GET');
})

export const fetchRoom = createAsyncThunk('rooms/fetchRoom', async (id: string | undefined) => {
  return api_request(`rooms/${id}`,'GET');
})

export const createRoom = createAsyncThunk('rooms/createRoom', async (newRoom: RoomsInterface) => {
  return api_request(`rooms`,'POST',newRoom);;
})

export const updateRoom = createAsyncThunk('rooms/updateRoom', async (updatedRoom: RoomsInterface) => {
  return api_request(`rooms/${updatedRoom._id}`,'PUT',updatedRoom);
})

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id: string) => {
  const result = await api_request(`rooms/${id}`,'DELETE');
  if(result === 'The room was correctly deleted.') { return id;}
 
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchRoom.pending, (state) => {
        console.log('pending')
        state.status = 'pending';
        state.item = null;
      })
      .addCase(fetchRoom.fulfilled, (state, action) => {
        console.log(action.payload)
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
      .addCase(updateRoom.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = state.data.filter((item)=> item._id !== action.payload);
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
export const getRooms = (state: RootState) => state.rooms.data;
export const getRoomsStatus = (state: RootState) => state.rooms.status;
export const getRoom = (state: RootState) => state.rooms.item;
