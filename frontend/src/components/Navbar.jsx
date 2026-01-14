import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold gradient-text">
                            GigFlow
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/"
                                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Browse Gigs
                                </Link>
                                <Link
                                    to="/post-gig"
                                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Post Gig
                                </Link>
                                <Link
                                    to="/my-gigs"
                                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    My Gigs
                                </Link>
                                <Link
                                    to="/my-bids"
                                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    My Bids
                                </Link>

                                {/* User Menu */}
                                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
                                    <div className="text-sm">
                                        <p className="font-medium text-gray-900">{user?.name}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="btn-outline text-sm py-2 px-4"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-outline text-sm py-2 px-4">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
