// src/features/dataSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../api/api';
import { DataType } from '../types/types';

interface DataState {
    data: DataType[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchDataAsync = createAsyncThunk('data/fetchData', async (endpoint: string) => {
    return await fetchData<DataType[]>(endpoint);
});

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default dataSlice.reducer;
