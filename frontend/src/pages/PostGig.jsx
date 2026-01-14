import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGig } from '../store/gigSlice';

const PostGig = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.gigs);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        budget: '',
    });

    const [validationError, setValidationError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setValidationError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title.trim()) {
            setValidationError('Title is required');
            return;
        }

        if (!formData.description.trim()) {
            setValidationError('Description is required');
            return;
        }

        if (!formData.budget || formData.budget <= 0) {
            setValidationError('Budget must be greater than 0');
            return;
        }

        // Submit
        const result = await dispatch(
            createGig({
                ...formData,
                budget: Number(formData.budget),
            })
        );

        if (result.type === 'gigs/createGig/fulfilled') {
            navigate('/my-gigs');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold gradient-text mb-2">Post a New Gig</h1>
                <p className="text-gray-600">Describe your project and find the perfect freelancer</p>
            </div>

            {/* Form Card */}
            <div className="card">
                {/* Error Messages */}
                {(error || validationError) && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {validationError || error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title *
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="input"
                            placeholder="e.g., Build a React Dashboard"
                            maxLength={100}
                        />
                        <p className="mt-1 text-xs text-gray-500">{formData.title.length}/100 characters</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Job Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            rows={6}
                            className="input resize-none"
                            placeholder="Describe your project requirements, skills needed, timeline, etc."
                            maxLength={1000}
                        />
                        <p className="mt-1 text-xs text-gray-500">{formData.description.length}/1000 characters</p>
                    </div>

                    {/* Budget */}
                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                            Budget (USD) *
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                $
                            </span>
                            <input
                                id="budget"
                                name="budget"
                                type="number"
                                required
                                min="1"
                                step="1"
                                value={formData.budget}
                                onChange={handleChange}
                                className="input pl-8"
                                placeholder="1000"
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Enter the maximum budget for this project</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary flex-1"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Posting...
                                </span>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Post Gig
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn-outline"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* Tips Card */}
            <div className="mt-6 glass rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Tips for posting a great gig
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Be specific and clear about what you need</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>List required skills and experience</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Set a realistic budget based on market rates</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Include timeline expectations if applicable</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PostGig;
