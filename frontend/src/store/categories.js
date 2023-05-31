import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { csrfFetch } from "./csrf";
import axios from "axios";
import Cookies from 'js-cookie';

export const categorySlice = createSlice({
    name:"categories",
    initialState: {
        allCategories:[],
        error:null,
        validationErrors:null
    },
    reducers:{
        clearErrors:(state)=> {
            state.error = null;
            state.validationErrors = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllCategories.fulfilled, (state, action)=>{
            state.allCategories = action.payload;
            state.validationErrors = null;
            state.error = null;
        })
        .addCase(getAllCategories.rejected, (state, action)=>{})
    }
})

export const getAllCategories = createAsyncThunk(
    "categories/getAllCategories",
    async (_, {rejectWithValue}) => {
        const res = await csrfFetch('/api/categories',{
            headers:{
                "Content-Type": "application/json",
            },
            // credentials: "include",
        })
        const data = res.json();

        if(!res.ok){
            return rejectWithValue(await res.json())
        }
        return data;
    }
)
export default categorySlice.reducer;