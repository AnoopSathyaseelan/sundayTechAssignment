const router = require('express').Router();
const { sendFriendRequest, getFriendsList, getAllFriendRequests, acceptFriendRequest } = require('./../controller/users.controller')
const authMiddleware = require('./../../../middlewares/auth.middleware')

router.get('/friend-request/:recipientId', authMiddleware, sendFriendRequest);
router.get('/friend-requests', authMiddleware, getAllFriendRequests);
router.put('/accept-friend-request/:requestId', authMiddleware, acceptFriendRequest);
router.get('/friends', authMiddleware, getFriendsList);

module.exports = router