const express = require('express');
const {
    getGigs,
    getGig,
    createGig,
    getMyGigs,
} = require('../controllers/gigController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getGigs).post(protect, createGig);
router.get('/my-gigs', protect, getMyGigs);
router.get('/:id', getGig);

module.exports = router;
