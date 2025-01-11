import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export const fetchStock=createAsyncThunk('stock/fetchStock',async()=>{
    const response=await axios.get(`${BASE_URL}/stock`);
    return response.data;
});

const stockSlice=createSlice({
    name:'stock',
    initialState:{
        items:[],
        status:'idle',
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchStock.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchStock.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.items=action.payload;
        })
        .addCase(fetchStock.rejected,(state)=>{
            state.status='failed';
        });
    },
});

export default stockSlice.reducer;