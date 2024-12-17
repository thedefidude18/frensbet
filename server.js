// server.js
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your bot token and channel ID
const BOT_TOKEN = '7782603906:AAFze6up2PrXU52eVVxQaJ3pBSMJhuDEimw';
const CHANNEL_ID = '@frensbet_news'; // Use the channel username

app.use(bodyParser.json());

app.post('/create-challenge', async (req, res) => {
  const { challengeDetails, walletAddress } = req.body;

  try {
    const message = `New Challenge Created:\nChallenged User: ${challengeDetails.challengedUser}\nEvent: ${challengeDetails.event}\nWager: ${challengeDetails.wager.amount} ${challengeDetails.wager.currency}\nWallet Address: ${walletAddress}`;
    
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHANNEL_ID,
      text: message,
    });

    res.status(200).send('Challenge broadcasted to Telegram channel.');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Failed to broadcast challenge.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});