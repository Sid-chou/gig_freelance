import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGigs } from '../store/gigSlice';
import { getMe } from '../store/authSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { gigs, isLoading } = useSelector((state) => state.gigs);
    const { user } = useSelector((state) => state.auth);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getMe());
        dispatch(fetchGigs());
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchGigs(searchTerm));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold gradient-text mb-2">Browse Gigs</h1>
                <p className="text-gray-600">Find exciting freelance opportunities</p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <form onSubmit={handleSearch} className="flex gap-3">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search gigs by title..."
                        className="input flex-1"
                    />
                    <button type="submit" className="btn-primary px-8">
                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search
                    </button>
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm('');
                                dispatch(fetchGigs());
                            }}
                            className="btn-outline"
                        >
                            Clear
                        </button>
                    )}
                </form>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            ) : (
                <>
                    {/* Results Count */}
                    <div className="mb-4">
                        <p className="text-gray-600">
                            {gigs.length} {gigs.length === 1 ? 'gig' : 'gigs'} available
                        </p>
                    </div>

                    {/* Gigs Grid */}
                    {gigs.length === 0 ? (
                        <div className="text-center py-20">
                            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No gigs found</h3>
                            <p className="text-gray-500 mb-6">Be the first to post a gig!</p>
                            <Link to="/post-gig" className="btn-primary inline-block">
                                Post a Gig
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {gigs.map((gig) => (
                                <GigCard key={gig._id} gig={gig} currentUserId={user?._id} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// Gig Card Component
const GigCard = ({ gig, currentUserId }) => {
    const isOwnGig = gig.ownerId?._id === currentUserId;

    return (
        <Link to={`/gig/${gig._id}`} className="card hover:shadow-2xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:gradient-text transition-all line-clamp-2">
                    {gig.title}
                </h3>
                {isOwnGig && (
                    <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full font-medium">
                        Your Gig
                    </span>
                )}
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {gig.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                    <p className="text-2xl font-bold text-primary-600">
                        ${gig.budget?.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Budget</p>
                </div>

                <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">
                        {gig.ownerId?.name || 'Anonymous'}
                    </p>
                    <p className="text-xs text-gray-500">
                        {new Date(gig.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${gig.status === 'open'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    <span
                        className={`w-2 h-2 rounded-full mr-2 ${gig.status === 'open' ? 'bg-green-500' : 'bg-gray-500'
                            }`}
                    ></span>
                    {gig.status === 'open' ? 'Open for Bids' : 'Assigned'}
                </span>
            </div>
        </Link>
    );
};

export default Dashboard;
