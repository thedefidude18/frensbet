// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract SocialBetting is ReentrancyGuard, Pausable, Ownable {
    using Counters for Counters.Counter;

    // Enums
    enum ChallengeType {
        DIRECT_PREDICTION,
        THIRD_PARTY_VERIFIED,
        COMMUNITY_VOTE,
        TIME_BASED
    }

    enum ChallengeStatus {
        PENDING,
        ACCEPTED,
        COMPLETED,
        SETTLED
    }

    // Structs
    struct Challenge {
        uint256 id;
        address challenger;
        address target;
        string prediction;
        uint256 wagerAmount;
        uint256 totalStake;
        address wagerToken;
        uint256 startTime;
        uint256 endTime;
        ChallengeType challengeType;
        ChallengeStatus status;
        uint256 communityVotingPeriod;
        uint256 communityVotes;
        mapping(address => bool) communityVoters;
        uint256 votingThreshold;
        address arbiter;
        address winner;
    }

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
    Counters.Counter private _challengeCounter;
    Counters.Counter private _betCounter;
    mapping(uint256 => Challenge) private challenges;
    mapping(uint256 => Bet) public bets;
    mapping(bytes32 => bool) public resolvedEvents;

    // Events
    event ChallengeCreated(
        uint256 indexed challengeId,
        address indexed challenger,
        uint256 wagerAmount,
        string prediction,
        uint256 startTime,
        uint256 endTime
    );
    event ChallengeModified(
        uint256 indexed challengeId,
        string newPrediction,
        uint256 newWagerAmount
    );
    event ChallengeAccepted(uint256 indexed challengeId, address indexed accepter);
    event ArbiterAssigned(uint256 indexed challengeId, address indexed arbiter);
    event CommunityVoteCast(
        uint256 indexed challengeId,
        address indexed voter,
        bool vote
    );
    event ChallengeResolved(
        uint256 indexed challengeId,
        address winner,
        uint256 payout
    );
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

    // Modifiers
    modifier onlyBetParticipants(uint256 betId) {
        require(
            msg.sender == bets[betId].creator || msg.sender == bets[betId].acceptor,
            "Not a participant in this bet"
        );
        _;
    }

    // Functions

    // Create a new challenge
    function createChallenge(
        address _target,
        string memory _prediction,
        uint256 _startTime,
        uint256 _endTime,
        address _wagerToken,
        uint256 _wagerAmount,
        ChallengeType _challengeType,
        address _arbiter,
        uint256 _votingThreshold
    ) external payable whenNotPaused nonReentrant {
        require(_startTime > block.timestamp, "Start time must be in the future");
        require(_endTime > _startTime, "End time must be after start time");

        _challengeCounter.increment();
        uint256 challengeId = _challengeCounter.current();

        Challenge storage newChallenge = challenges[challengeId];
        newChallenge.id = challengeId;
        newChallenge.challenger = msg.sender;
        newChallenge.target = _target;
        newChallenge.prediction = _prediction;
        newChallenge.wagerAmount = _wagerAmount;
        newChallenge.totalStake = _wagerAmount;
        newChallenge.wagerToken = _wagerToken;
        newChallenge.startTime = _startTime;
        newChallenge.endTime = _endTime;
        newChallenge.challengeType = _challengeType;
        newChallenge.status = ChallengeStatus.PENDING;

        if (_challengeType == ChallengeType.COMMUNITY_VOTE) {
            require(_votingThreshold > 0 && _votingThreshold <= 100, "Invalid voting threshold");
            newChallenge.votingThreshold = _votingThreshold;
            newChallenge.communityVotingPeriod = _endTime + 1 days;
        }

        if (_challengeType == ChallengeType.THIRD_PARTY_VERIFIED) {
            require(_arbiter != address(0), "Arbiter required for this type");
            newChallenge.arbiter = _arbiter;
            emit ArbiterAssigned(challengeId, _arbiter);
        }

        emit ChallengeCreated(
            challengeId,
            msg.sender,
            _wagerAmount,
            _prediction,
            _startTime,
            _endTime
        );
    }

    // Modify a challenge
    function modifyChallenge(
        uint256 _challengeId,
        string memory _newPrediction,
        uint256 _newWagerAmount
    ) external nonReentrant {
        Challenge storage challenge = challenges[_challengeId];

        require(msg.sender == challenge.challenger, "Only challenger can modify");
        require(challenge.status == ChallengeStatus.PENDING, "Cannot modify accepted challenge");

        if (bytes(_newPrediction).length > 0) {
            challenge.prediction = _newPrediction;
        }

        if (_newWagerAmount > challenge.wagerAmount) {
            uint256 additionalAmount = _newWagerAmount - challenge.wagerAmount;
            require(msg.value >= additionalAmount, "Insufficient funds");
            challenge.wagerAmount = _newWagerAmount;
        }

        emit ChallengeModified(_challengeId, _newPrediction, _newWagerAmount);
    }

    // Create a new bet
    function createBet(
        uint256 stake,
        uint256 duration,
        string memory description,
        bytes32 eventId
    ) external payable nonReentrant {
        require(msg.value == stake, "Stake amount must match sent value");
        require(duration > 0, "Duration must be greater than 0");

        _betCounter.increment();
        uint256 betId = _betCounter.current();

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
        require(msg.value == bet.stake, "Stake amount must match");

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
        require(block.timestamp >= bet.createdAt + bet.duration, "Duration not ended");
        require(winner == bet.creator || winner == bet.acceptor, "Winner must be a participant");

        uint256 totalStake = bet.totalStake;
        bet.settled = true;
        bet.winner = winner;
        resolvedEvents[bet.eventId] = true;

        payable(winner).transfer(totalStake);

        emit BetResolved(betId, winner, totalStake);
    }
}
