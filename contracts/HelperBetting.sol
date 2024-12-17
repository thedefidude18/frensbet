// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SocialPlatformTracker is Ownable {
    using Counters for Counters.Counter;

    // Enum for comprehensive user and challenge statuses
    enum ChallengeState {
        PENDING,
        AWAITING_ACCEPTANCE,
        ACTIVE,
        COMPLETED_WON,
        COMPLETED_LOST,
        DECLINED,
        CANCELLED
    }

    enum NotificationType {
        CHALLENGE_RECEIVED,
        CHALLENGE_ACCEPTED,
        CHALLENGE_DECLINED,
        CHALLENGE_COMPLETED,
        CHALLENGE_EXPIRED,
        REWARD_RECEIVED,
        PROFILE_MILESTONE
    }

    // Leaderboard Structures
    struct LeaderboardEntry {
        address user;
        uint256 totalChallenges;
        uint256 wonChallenges;
        uint256 lostChallenges;
        uint256 reputation;
        uint256 totalEarnings;
    }

    // Notification Structure
    struct Notification {
        uint256 id;
        address recipient;
        NotificationType notificationType;
        uint256 timestamp;
        uint256 challengeId;
        uint256 amount;
        bool isRead;
    }

    // Activity Tracking Structure
    struct ActivityLog {
        uint256 id;
        address user;
        string activityType;
        uint256 timestamp;
        uint256 challengeId;
        uint256 amount;
    }

    // Leaderboard Management
    mapping(address => LeaderboardEntry) public leaderboardEntries;
    address[] public leaderboardUsers;

    // Notification System
    mapping(address => Notification[]) public userNotifications;
    Counters.Counter private notificationIdCounter;

    // Activity Logging
    mapping(address => ActivityLog[]) public userActivities;
    Counters.Counter private activityLogIdCounter;

    // Challenge Tracking
    mapping(address => uint256[]) public userChallengesByState;
    mapping(address => mapping(ChallengeState => uint256[])) public categorizedChallenges;

    // Events
    event LeaderboardUpdated(address indexed user, uint256 reputation, uint256 totalEarnings);
    event NotificationCreated(address indexed recipient, NotificationType indexed notificationType);
    event ActivityLogged(address indexed user, string activityType, uint256 timestamp);

    // Leaderboard Functions
    function updateLeaderboard(
        address _user, 
        bool _won, 
        uint256 _amount
    ) external {
        LeaderboardEntry storage entry = leaderboardEntries[_user];
        
        // Increment challenge count
        entry.totalChallenges++;
        
        // Update wins/losses
        if (_won) {
            entry.wonChallenges++;
            entry.reputation += 10;
            entry.totalEarnings += _amount;
        } else {
            entry.lostChallenges++;
            entry.reputation = entry.reputation > 5 ? entry.reputation - 5 : 0;
        }

        // Ensure user is in leaderboard
        if (entry.user == address(0)) {
            entry.user = _user;
            leaderboardUsers.push(_user);
        }

        emit LeaderboardUpdated(_user, entry.reputation, entry.totalEarnings);
    }

    // Get Top Leaderboard Entries
    function getTopLeaderboard(uint256 _count) external view returns (LeaderboardEntry[] memory) {
        // Sort and return top entries
        LeaderboardEntry[] memory topEntries = new LeaderboardEntry[](_count);
        
        // Simple bubble sort (can be optimized)
        for (uint256 i = 0; i < leaderboardUsers.length; i++) {
            for (uint256 j = 0; j < _count; j++) {
                if (leaderboardEntries[leaderboardUsers[i]].reputation > 
                    (topEntries[j].reputation)) {
                    // Shift entries and insert
                    for (uint256 k = _count - 1; k > j; k--) {
                        topEntries[k] = topEntries[k-1];
                    }
                    topEntries[j] = leaderboardEntries[leaderboardUsers[i]];
                    break;
                }
            }
        }

        return topEntries;
    }

    // Notification System
    function createNotification(
        address _recipient,
        NotificationType _type,
        uint256 _challengeId,
        uint256 _amount
    ) external {
        notificationIdCounter.increment();
        uint256 newNotificationId = notificationIdCounter.current();

        Notification memory newNotification = Notification({
            id: newNotificationId,
            recipient: _recipient,
            notificationType: _type,
            timestamp: block.timestamp,
            challengeId: _challengeId,
            amount: _amount,
            isRead: false
        });

        userNotifications[_recipient].push(newNotification);

        emit NotificationCreated(_recipient, _type);
    }

    // Mark Notifications as Read
    function markNotificationsAsRead(uint256[] memory _notificationIds) external {
        Notification[] storage notifications = userNotifications[msg.sender];
        
        for (uint256 i = 0; i < _notificationIds.length; i++) {
            for (uint256 j = 0; j < notifications.length; j++) {
                if (notifications[j].id == _notificationIds[i] && 
                    notifications[j].recipient == msg.sender) {
                    notifications[j].isRead = true;
                    break;
                }
            }
        }
    }

    // Activity Logging
    function logActivity(
        address _user,
        string memory _activityType,
        uint256 _challengeId,
        uint256 _amount
    ) external {
        activityLogIdCounter.increment();
        uint256 newActivityId = activityLogIdCounter.current();

        ActivityLog memory newActivity = ActivityLog({
            id: newActivityId,
            user: _user,
            activityType: _activityType,
            timestamp: block.timestamp,
            challengeId: _challengeId,
            amount: _amount
        });

        userActivities[_user].push(newActivity);

        emit ActivityLogged(_user, _activityType, block.timestamp);
    }

    // Challenge State Tracking
    function updateChallengeState(
        address _user,
        uint256 _challengeId,
        ChallengeState _newState
    ) external {
        // Remove from previous state categories
        for (uint256 i = 0; i < categorizedChallenges[_user][_newState].length; i++) {
            if (categorizedChallenges[_user][_newState][i] == _challengeId) {
                return; // Already in this state
            }
        }

        // Add to new state category
        categorizedChallenges[_user][_newState].push(_challengeId);
    }

    // View Functions for Challenge Categories
    function getChallengesByState(
        address _user, 
        ChallengeState _state
    ) external view returns (uint256[] memory) {
        return categorizedChallenges[_user][_state];
    }

    // Get User Challenge Statistics
    function getUserChallengeStats(address _user) external view returns (
        uint256 totalChallenges,
        uint256 pendingChallenges,
        uint256 activeChallenges,
        uint256 wonChallenges,
        uint256 lostChallenges,
        uint256 declinedChallenges
    ) {
        LeaderboardEntry memory entry = leaderboardEntries[_user];
        
        return (
            entry.totalChallenges,
            categorizedChallenges[_user][ChallengeState.PENDING].length,
            categorizedChallenges[_user][ChallengeState.ACTIVE].length,
            entry.wonChallenges,
            entry.lostChallenges,
            categorizedChallenges[_user][ChallengeState.DECLINED].length
        );
    }

    // Unread Notification Count
    function getUnreadNotificationCount(address _user) external view returns (uint256) {
        Notification[] memory notifications = userNotifications[_user];
        uint256 unreadCount = 0;
        
        for (uint256 i = 0; i < notifications.length; i++) {
            if (!notifications[i].isRead) {
                unreadCount++;
            }
        }
        
        return unreadCount;
    }
}