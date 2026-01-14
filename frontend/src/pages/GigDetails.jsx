import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigById } from '../store/gigSlice';
import { createBid, fetchBidsForGig, hireBid, clearSuccess } from '../store/bidSlice';

const GigDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentGig, isLoading: gigLoading } = useSelector((state) => state.gigs);
    const { bids, isLoading: bidLoading, success } = useSelector((state) => state.bids);
    const { user } = useSelector((state) => state.auth);

    const [showBidForm, setShowBidForm] = useState(false);
    const [bidData, setBidData] = useState({
        message: '',
        proposedPrice: '',
    });

    const isOwner = currentGig?.ownerId?._id === user?._id;

    useEffect(() => {
        dispatch(fetchGigById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (isOwner && currentGig) {
            dispatch(fetchBidsForGig(id));
        }
    }, [dispatch, id, isOwner, currentGig]);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch(clearSuccess());
            }, 3000);
        }
    }, [success, dispatch]);

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(
            createBid({
                gigId: id,
                ...bidData,
                proposedPrice: Number(bidData.proposedPrice),
            })
        );

        if (result.type === 'bids/createBid/fulfilled') {
            setBidData({ message: '', proposedPrice: '' });
            setShowBidForm(false);
        }
    };

    const handleHire = async (bidId) => {
        if (window.confirm('Are you sure you want to hire this freelancer?')) {
            await dispatch(hireBid(bidId));
            dispatch(fetchGigById(id)); // Refresh gig details
        }
    };

    if (gigLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!currentGig) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Gig not found</h2>
                <button onClick={() => navigate('/')} className="btn-primary">
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Success Message */}
            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg animate-fade-in">
                    {success}
                </div>
            )}

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>

            {/* Gig Details Card */}
            <div className="card mb-8">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentGig.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {currentGig.ownerId?.name}
                            </span>
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Posted {new Date(currentGig.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${currentGig.status === 'open'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                    >
                        {currentGig.status === 'open' ? '🟢 Open' : '🔒 Assigned'}
                    </span>
                </div>

                {/* Budget */}
                <div className="mb-6 p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-primary-700 mb-1">Budget</p>
                    <p className="text-3xl font-bold text-primary-600">
                        ${currentGig.budget?.toLocaleString()}
                    </p>
                </div>

                {/* Description */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{currentGig.description}</p>
                </div>

                {/* Action Buttons for Non-Owners */}
                {!isOwner && currentGig.status === 'open' && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        {!showBidForm ? (
                            <button onClick={() => setShowBidForm(true)} className="btn-primary w-full md:w-auto">
                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Place a Bid
                            </button>
                        ) : (
                            <form onSubmit={handleBidSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Bid Message
                                    </label>
                                    <textarea
                                        required
                                        value={bidData.message}
                                        onChange={(e) => setBidData({ ...bidData, message: e.target.value })}
                                        rows={4}
                                        className="input"
                                        placeholder="Explain why you're the best fit for this project..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Proposed Price (USD)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            value={bidData.proposedPrice}
                                            onChange={(e) => setBidData({ ...bidData, proposedPrice: e.target.value })}
                                            className="input pl-8"
                                            placeholder="1000"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button type="submit" disabled={bidLoading} className="btn-primary">
                                        {bidLoading ? 'Submitting...' : 'Submit Bid'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowBidForm(false)}
                                        className="btn-outline"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </div>

            {/* Bids Section (Owner Only) */}
            {isOwner && (
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Received Bids ({bids.length})
                    </h2>

                    {bidLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                        </div>
                    ) : bids.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p>No bids received yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bids.map((bid) => (
                                <div
                                    key={bid._id}
                                    className={`p-4 rounded-lg border-2 ${bid.status === 'hired'
                                            ? 'border-green-500 bg-green-50'
                                            : bid.status === 'rejected'
                                                ? 'border-gray-300 bg-gray-50'
                                                : 'border-gray-200 bg-white'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">
                                                {bid.freelancerId?.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{bid.freelancerId?.name}</h4>
                                                <p className="text-sm text-gray-500">{bid.freelancerId?.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-primary-600">
                                                ${bid.proposedPrice?.toLocaleString()}
                                            </p>
                                            <span
                                                className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${bid.status === 'hired'
                                                        ? 'bg-green-200 text-green-800'
                                                        : bid.status === 'rejected'
                                                            ? 'bg-gray-200 text-gray-700'
                                                            : 'bg-yellow-200 text-yellow-800'
                                                    }`}
                                            >
                                                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 mb-3">{bid.message}</p>

                                    {bid.status === 'pending' && currentGig.status === 'open' && (
                                        <button
                                            onClick={() => handleHire(bid._id)}
                                            className="btn-primary text-sm"
                                        >
                                            ✅ Hire This Freelancer
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GigDetails;
