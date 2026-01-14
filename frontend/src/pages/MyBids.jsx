import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyGigs } from '../store/gigSlice';

const MyGigs = () => {
    const dispatch = useDispatch();
    const { myGigs, isLoading } = useSelector((state) => state.gigs);

    useEffect(() => {
        dispatch(fetchMyGigs());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold gradient-text mb-2">My Gigs</h1>
                    <p className="text-gray-600">Manage your posted jobs and view bids</p>
                </div>
                <Link to="/post-gig" className="btn-primary">
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Post New Gig
                </Link>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            ) : (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Gigs</p>
                                    <p className="text-3xl font-bold text-gray-900">{myGigs.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Open</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {myGigs.filter((g) => g.status === 'open').length}
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
                                    <p className="text-sm text-gray-600 mb-1">Assigned</p>
                                    <p className="text-3xl font-bold text-gray-600">
                                        {myGigs.filter((g) => g.status === 'assigned').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gigs List */}
                    {myGigs.length === 0 ? (
                        <div className="card text-center py-16">
                            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No gigs posted yet</h3>
                            <p className="text-gray-500 mb-6">Start by posting your first gig</p>
                            <Link to="/post-gig" className="btn-primary inline-block">
                                Post a Gig
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {myGigs.map((gig) => (
                                <Link
                                    key={gig._id}
                                    to={`/gig/${gig._id}`}
                                    className="card hover:shadow-2xl transition-all duration-300 group block"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:gradient-text transition-all">
                                                    {gig.title}
                                                </h3>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${gig.status === 'open'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    {gig.status === 'open' ? '🟢 Open' : '🔒 Assigned'}
                                                </span>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{gig.description}</p>

                                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(gig.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className="font-bold text-primary-600">${gig.budget?.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyGigs;
