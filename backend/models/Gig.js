const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a job title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a job description'],
        },
        budget: {
            type: Number,
            required: [true, 'Please provide a budget'],
            min: [0, 'Budget cannot be negative'],
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['open', 'assigned'],
            default: 'open',
        },
    },
    {
        timestamps: true,
    }
);

// Index for searching by title
gigSchema.index({ title: 'text' });

module.exports = mongoose.model('Gig', gigSchema);
