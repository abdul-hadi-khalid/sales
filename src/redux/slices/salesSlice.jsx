import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchSales=createAsyncThunk('sales/fetchSales',async()=>{
    const response=await axios.get(`${BASE_URL}/sales/week`);
    return response.data;
});

export const recordSale=createAsyncThunk('sales/recordSale',async(sale)=>{
    const response=await axios.post(`${BASE_URL}/sales`,sale);
    return response.data;
});

const salesSlice=createSlice({
    name:'sales',
    initialState:{
        weekly:{},
        status:'idle',
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchSales.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchSales.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.weekly=action.payload;
        })
        .addCase(fetchSales.rejected,(state)=>{
            state.status='failed';
        })
        .addCase(recordSale.fulfilled,(state,action)=>{
            const today=new Date().toLocaleString('en-us',{weekday:'long'});
            if(state.weekly[today]){
                state.weekly[today].push(action.payload.sale);
            }
        });
    }
});

export default salesSlice.reducer;