import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyBids } from '../store/bidSlice';

const MyBids = () => {
    const dispatch = useDispatch();
    const { myBids, isLoading } = useSelector((state) => state.bids);

    useEffect(() => {
        dispatch(fetchMyBids());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold gradient-text mb-2">My Bids</h1>
                <p className="text-gray-600">Track all your submitted proposals</p>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            ) : (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Bids</p>
                                    <p className="text-3xl font-bold text-gray-900">{myBids.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Pending</p>
                                    <p className="text-3xl font-bold text-yellow-600">
                                        {myBids.filter((b) => b.status === 'pending').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Hired</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {myBids.filter((b) => b.status === 'hired').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Rejected</p>
                                    <p className="text-3xl font-bold text-gray-600">
                                        {myBids.filter((b) => b.status === 'rejected').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bids List */}
                    {myBids.length === 0 ? (
                        <div className="card text-center py-16">
                            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bids submitted yet</h3>
                            <p className="text-gray-500 mb-6">Browse available gigs and submit your first bid</p>
                            <Link to="/" className="btn-primary inline-block">
                                Browse Gigs
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {myBids.map((bid) => (
                                <div
                                    key={bid._id}
                                    className={`card ${bid.status === 'hired'
                                            ? 'border-2 border-green-500'
                                            : bid.status === 'rejected'
                                                ? 'opacity-75'
                                                : ''
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <Link
                                                to={`/gig/${bid.gigId?._id}`}
                                                className="text-xl font-bold text-gray-900 hover:gradient-text transition-all inline-block mb-2"
                                            >
                                                {bid.gigId?.title}
                                            </Link>

                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(bid.createdAt).toLocaleDateString()}
                                                </span>
                                                <span>Budget: ${bid.gigId?.budget?.toLocaleString()}</span>
                                            </div>

                                            <p className="text-gray-600 mb-4">{bid.message}</p>
                                        </div>

                                        <div className="ml-4 text-right">
                                            <p className="text-2xl font-bold text-primary-600 mb-2">
                                                ${bid.proposedPrice?.toLocaleString()}
                                            </p>
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${bid.status === 'hired'
                                                        ? 'bg-green-100 text-green-800'
                                                        : bid.status === 'rejected'
                                                            ? 'bg-gray-200 text-gray-700'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                            >
                                                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Success Message for Hired */}
                                    {bid.status === 'hired' && (
                                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                                            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-green-700 font-medium">
                                                🎉 Congratulations! You've been hired for this project!
                                            </span>
                                        </div>
                                    )}

                                    {/* View Gig Link */}
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <Link
                                            to={`/gig/${bid.gigId?._id}`}
                                            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                                        >
                                            View Gig Details
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyBids;
