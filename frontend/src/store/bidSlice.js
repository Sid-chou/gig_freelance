import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';

// Async thunks
export const createBid = createAsyncThunk(
    'bids/createBid',
    async (bidData, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/bids', bidData);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create bid');
        }
    }
);

export const fetchBidsForGig = createAsyncThunk(
    'bids/fetchBidsForGig',
    async (gigId, { rejectWithValue }) => {
        try {
            const { data } = await API.get(`/bids/${gigId}`);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch bids');
        }
    }
);

export const fetchMyBids = createAsyncThunk(
    'bids/fetchMyBids',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get('/bids/my-bids');
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch your bids');
        }
    }
);

export const hireBid = createAsyncThunk(
    'bids/hireBid',
    async (bidId, { rejectWithValue }) => {
        try {
            const { data } = await API.patch(`/bids/${bidId}/hire`);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to hire freelancer');
        }
    }
);

const bidSlice = createSlice({
    name: 'bids',
    initialState: {
        bids: [],
        myBids: [],
        isLoading: false,
        error: null,
        success: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create bid
            .addCase(createBid.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createBid.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = 'Bid submitted successfully';
            })
            .addCase(createBid.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch bids for gig
            .addCase(fetchBidsForGig.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBidsForGig.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bids = action.payload;
            })
            .addCase(fetchBidsForGig.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Fetch my bids
            .addCase(fetchMyBids.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMyBids.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myBids = action.payload;
            })
            .addCase(fetchMyBids.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Hire bid
            .addCase(hireBid.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(hireBid.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = 'Freelancer hired successfully';
                // Update the bids list
                state.bids = state.bids.map(bid =>
                    bid._id === action.payload._id
                        ? { ...bid, status: 'hired' }
                        : bid.status === 'pending'
                            ? { ...bid, status: 'rejected' }
                            : bid
                );
            })
            .addCase(hireBid.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearSuccess } = bidSlice.actions;
export default bidSlice.reducer;
