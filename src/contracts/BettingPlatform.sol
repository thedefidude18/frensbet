what are the fucnrions in this contract   // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BettingPlatform is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    // Structs
    struct Bet {
        address creator;
        address acceptor;
        uint256 stake;
        uint256 totalStake;
        uint256 createdAt;
        uint256 duration;
        string description;
        bytes32 eventId;
        bool settled;
        address winner;
    }

    // State variables
    Counters.Counter private _betIdCounter;
    mapping(uint256 => Bet) public bets;
    mapping(bytes32 => bool) public resolvedEvents;

    // Events
    event BetCreated(
        uint256 indexed betId,
        address indexed creator,
        uint256 stake,
        string description,
        uint256 duration
    );
    event BetAccepted(
        uint256 indexed betId,
        address indexed acceptor,
        uint256 stake
    );
    event BetResolved(
        uint256 indexed betId,
        address winner,
        uint256 payout
    );

    constructor() {}

    // Modifiers
    modifier onlyBetParticipants(uint256 betId) {
        require(
            msg.sender == bets[betId].creator || msg.sender == bets[betId].acceptor,
            "Not a participant in this bet"
        );
        _;
    }

    // Create a new bet
    function createBet(uint256 stake, uint256 duration, string memory description, bytes32 eventId) external payable nonReentrant {
        require(msg.value == stake, "Stake amount must match sent value");
        require(duration > 0, "Duration must be greater than 0");

        _betIdCounter.increment();
        uint256 betId = _betIdCounter.current();

        bets[betId] = Bet({
            creator: msg.sender,
            acceptor: address(0),
            stake: stake,
            totalStake: stake,
            createdAt: block.timestamp,
            duration: duration,
            description: description,
            eventId: eventId,
            settled: false,
            winner: address(0)
        });

        emit BetCreated(betId, msg.sender, stake, description, duration);
    }

    // Accept a bet
    function acceptBet(uint256 betId) external payable nonReentrant {
        Bet storage bet = bets[betId];

        require(bet.creator != address(0), "Bet does not exist");
        require(bet.acceptor == address(0), "Bet already accepted");
        require(!bet.settled, "Bet already settled");
        require(msg.value == bet.stake, "Stake amount must match the creator's stake");

        bet.acceptor = msg.sender;
        bet.totalStake += msg.value;

        emit BetAccepted(betId, msg.sender, msg.value);
    }

    // Resolve a bet
    function resolveBet(uint256 betId, address winner) external onlyOwner nonReentrant {
        Bet storage bet = bets[betId];

        require(bet.creator != address(0), "Bet does not exist");
        require(bet.acceptor != address(0), "Bet not yet accepted");
        require(!bet.settled, "Bet already settled");
        require(block.timestamp >= bet.createdAt + bet.duration, "Bet duration not yet ended");
        require(winner == bet.creator || winner == bet.acceptor, "Winner must be a participant");

        uint256 totalStake = bet.totalStake;

        // Update bet state
        bet.settled = true;
        bet.winner = winner;
        resolvedEvents[bet.eventId] = true;

        // Transfer funds
        payable(winner).transfer(totalStake);

        emit BetResolved(betId, winner, totalStake);
    }

    // Withdraw contract balance (emergency use)
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}