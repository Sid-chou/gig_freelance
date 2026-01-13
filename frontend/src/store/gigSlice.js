import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';

// Async thunks
export const fetchGigs = createAsyncThunk(
    'gigs/fetchGigs',
    async (search = '', { rejectWithValue }) => {
        try {
            const { data } = await API.get(`/gigs${search ? `?search=${search}` : ''}`);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch gigs');
        }
    }
);

export const fetchGigById = createAsyncThunk(
    'gigs/fetchGigById',
    async (gigId, { rejectWithValue }) => {
        try {
            const { data } = await API.get(`/gigs/${gigId}`);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch gig');
        }
    }
);

export const createGig = createAsyncThunk(
    'gigs/createGig',
    async (gigData, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/gigs', gigData);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create gig');
        }
    }
);

export const fetchMyGigs = createAsyncThunk(
    'gigs/fetchMyGigs',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get('/gigs/my-gigs');
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch your gigs');
        }
    }
);

const gigSlice = createSlice({
    name: 'gigs',
    initialState: {
        gigs: [],
        currentGig: null,
        myGigs: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentGig: (state) => {
            state.currentGig = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all gigs
            .addCase(fetchGigs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGigs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.gigs = action.payload;
            })
            .addCase(fetchGigs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch gig by ID
            .addCase(fetchGigById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGigById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentGig = action.payload;
            })
            .addCase(fetchGigById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Create gig
            .addCase(createGig.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createGig.fulfilled, (state, action) => {
                state.isLoading = false;
                state.gigs.unshift(action.payload);
            })
            .addCase(createGig.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch my gigs
            .addCase(fetchMyGigs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMyGigs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myGigs = action.payload;
            })
            .addCase(fetchMyGigs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearCurrentGig } = gigSlice.actions;
export default gigSlice.reducer;
