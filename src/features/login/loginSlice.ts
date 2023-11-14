import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginInitialState, LoginInterface } from "../interfaces/interfaces";


export const userLogin = createAsyncThunk('login/userLogin', async (data: LoginInterface) => {
    const response = (await fetch('http://127.0.0.1:3000/login', {
        method: 'POST', 
        mode: 'cors', 
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    }));
    return response.json();
})

const initialState: ILoginInitialState = {
    data: [],
    status: 'idle',
    error: null
}


const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                localStorage.setItem("token",action.payload.token);
            })
            .addCase(userLogin.pending, (state, action) => {
                state.status = 'pending';
                state.error = null;
                //state.data = action.payload;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = 'true';
                //state.data = action.payload;
            })
    }

});

export default loginSlice.reducer;