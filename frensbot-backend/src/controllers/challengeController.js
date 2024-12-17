// src/controllers/challengeController.js
const Challenge = require('../models/challengeModel');

const postChallenge = async (req, res) => {
  try {
    const { challengeDetails, walletAddress } = req.body;

    // Validate request
    if (!challengeDetails || !walletAddress) {
      return res.status(400).json({ message: 'Invalid request. Missing required fields.' });
    }

    // Save to database
    const challenge = new Challenge({ ...challengeDetails, walletAddress });
    await challenge.save();

    res.status(201).json({ message: 'Challenge created successfully.', challenge });
  } catch (error) {
    console.error('Error posting challenge:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { postChallenge };
