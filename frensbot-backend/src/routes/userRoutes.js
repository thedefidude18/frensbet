const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Challenge = require('../models/Challenge'); // Assuming a Challenge model
const Payout = require('../models/Payout'); // Assuming a Payout model
const authMiddleware = require('../middleware/auth'); // Authentication middleware

const router = express.Router();

/* ==========================
   User Registration Route
   ========================== */
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

/* ==========================
   Create Challenge Route
   ========================== */
router.post('/create-challenge', authMiddleware, async (req, res) => {
    const { event, stake, timeframe, opponent } = req.body;
    const userId = req.user.id;

    if (!event || !stake || !timeframe) {
        return res.status(400).json({ message: 'Event, stake, and timeframe are required' });
    }

    try {
        const challenge = await Challenge.create({
            event,
            stake,
            timeframe,
            opponent: opponent || null, // Optional opponent
            creator: userId,
            status: 'active',
        });

        res.status(201).json({ message: 'Challenge created successfully', challenge });
    } catch (error) {
        console.error('Create Challenge Error:', error);
        res.status(500).json({ message: 'Server error while creating challenge' });
    }
});

/* ==========================
   Get Ongoing Challenges
   ========================== */
router.get('/ongoing-challenges', authMiddleware, async (req, res) => {
    try {
        const challenges = await Challenge.find({ status: 'active' })
            .populate('creator', 'username') // Show creator's username
            .populate('opponent', 'username'); // Show opponent's username

        res.status(200).json({ ongoingChallenges: challenges });
    } catch (error) {
        console.error('Ongoing Challenges Error:', error);
        res.status(500).json({ message: 'Server error while fetching ongoing challenges' });
    }
});

/* ==========================
   Get Completed Challenges
   ========================== */
router.get('/completed-challenges', authMiddleware, async (req, res) => {
    try {
        const challenges = await Challenge.find({ status: 'completed' })
            .populate('creator', 'username')
            .populate('opponent', 'username')
            .sort({ updatedAt: -1 }); // Sort by latest completed

        res.status(200).json({ completedChallenges: challenges });
    } catch (error) {
        console.error('Completed Challenges Error:', error);
        res.status(500).json({ message: 'Server error while fetching completed challenges' });
    }
});

/* ==========================
   Get User Wallet and Payouts
   ========================== */
router.get('/wallet', authMiddleware, async (req, res) => {
    const userId = req.user.id;

    try {
        const payouts = await Payout.find({ user: userId });
        const totalEarnings = payouts.reduce((total, payout) => total + payout.amount, 0);

        const activeChallenges = await Challenge.find({
            $or: [{ creator: userId }, { opponent: userId }],
            status: 'active',
        });

        const walletData = {
            totalEarnings,
            activeStakes: activeChallenges.reduce((total, challenge) => total + challenge.stake, 0),
            payouts,
        };

        res.status(200).json(walletData);
    } catch (error) {
        console.error('Wallet Error:', error);
        res.status(500).json({ message: 'Server error while fetching wallet data' });
    }
});

/* ==========================
   Leaderboard Route
   ========================== */
router.get('/leaderboard', async (req, res) => {
    try {
        const users = await User.find()
            .sort({ totalWins: -1 }) // Assuming a 'totalWins' field tracks leaderboard rankings
            .select('username totalWins');

        res.status(200).json({ leaderboard: users });
    } catch (error) {
        console.error('Leaderboard Error:', error);
        res.status(500).json({ message: 'Server error while fetching leaderboard data' });
    }
});

/* ==========================
   Withdraw Funds (Payout)
   ========================== */
router.post('/withdraw', authMiddleware, async (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Please specify a valid withdrawal amount' });
    }

    try {
        const user = await User.findById(userId);

        // Check if user has enough earnings to withdraw
        if (user.earnings < amount) {
            return res.status(400).json({ message: 'Insufficient earnings for withdrawal' });
        }

        // Deduct from user's earnings and record payout
        user.earnings -= amount;
        await user.save();

        await Payout.create({
            user: userId,
            amount,
            status: 'pending', // You can add payment gateway handling here
        });

        res.status(200).json({ message: 'Withdrawal request submitted successfully' });
    } catch (error) {
        console.error('Withdraw Error:', error);
        res.status(500).json({ message: 'Server error while processing withdrawal' });
    }
});

module.exports = router;
