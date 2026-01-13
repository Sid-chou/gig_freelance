const Bid = require('../models/Bid');
const Gig = require('../models/Gig');
const mongoose = require('mongoose');

// @desc    Submit a bid on a gig
// @route   POST /api/bids
// @access  Private
const createBid = async (req, res) => {
    try {
        const { gigId, message, proposedPrice } = req.body;

        // Validation
        if (!gigId || !message || !proposedPrice) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        // Check if gig exists and is open
        const gig = await Gig.findById(gigId);

        if (!gig) {
            return res.status(404).json({
                success: false,
                message: 'Gig not found',
            });
        }

        if (gig.status !== 'open') {
            return res.status(400).json({
                success: false,
                message: 'This gig is no longer accepting bids',
            });
        }

        // Prevent user from bidding on their own gig
        if (gig.ownerId.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot bid on your own gig',
            });
        }

        // Create bid
        const bid = await Bid.create({
            gigId,
            freelancerId: req.user._id,
            message,
            proposedPrice,
        });

        const populatedBid = await Bid.findById(bid._id)
            .populate('freelancerId', 'name email')
            .populate('gigId', 'title');

        res.status(201).json({
            success: true,
            data: populatedBid,
        });
    } catch (error) {
        console.error('Create bid error:', error);

        // Handle duplicate bid error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'You have already submitted a bid for this gig',
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get all bids for a specific gig
// @route   GET /api/bids/:gigId
// @access  Private (Gig owner only)
const getBidsForGig = async (req, res) => {
    try {
        const { gigId } = req.params;

        // Check if gig exists
        const gig = await Gig.findById(gigId);

        if (!gig) {
            return res.status(404).json({
                success: false,
                message: 'Gig not found',
            });
        }

        // Only gig owner can view bids
        if (gig.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view these bids',
            });
        }

        const bids = await Bid.find({ gigId })
            .populate('freelancerId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bids.length,
            data: bids,
        });
    } catch (error) {
        console.error('Get bids error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Get user's submitted bids
// @route   GET /api/bids/my-bids
// @access  Private
const getMyBids = async (req, res) => {
    try {
        const bids = await Bid.find({ freelancerId: req.user._id })
            .populate('gigId', 'title budget status')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bids.length,
            data: bids,
        });
    } catch (error) {
        console.error('Get my bids error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @desc    Hire a freelancer (THE CRUCIAL LOGIC)
// @route   PATCH /api/bids/:bidId/hire
// @access  Private (Gig owner only)
const hireBid = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { bidId } = req.params;

        // Find the bid with session
        const bid = await Bid.findById(bidId)
            .populate('gigId')
            .session(session);

        if (!bid) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success: false,
                message: 'Bid not found',
            });
        }

        const gig = bid.gigId;

        // Check if user is the gig owner
        if (gig.ownerId.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({
                success: false,
                message: 'Not authorized to hire for this gig',
            });
        }

        // Check if gig is still open
        if (gig.status !== 'open') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                success: false,
                message: 'This gig is already assigned',
            });
        }

        // ATOMIC OPERATIONS:
        // 1. Update the gig status to 'assigned'
        await Gig.findByIdAndUpdate(
            gig._id,
            { status: 'assigned' },
            { session }
        );

        // 2. Update the selected bid status to 'hired'
        await Bid.findByIdAndUpdate(
            bidId,
            { status: 'hired' },
            { session }
        );

        // 3. Update all other bids for the same gig to 'rejected'
        await Bid.updateMany(
            {
                gigId: gig._id,
                _id: { $ne: bidId },
                status: 'pending',
            },
            { status: 'rejected' },
            { session }
        );

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Fetch updated bid with populated data
        const updatedBid = await Bid.findById(bidId)
            .populate('freelancerId', 'name email')
            .populate('gigId', 'title budget status');

        res.status(200).json({
            success: true,
            message: 'Freelancer hired successfully',
            data: updatedBid,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Hire bid error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createBid,
    getBidsForGig,
    getMyBids,
    hireBid,
};
