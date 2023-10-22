const FriendRequest = require('../models/friendRequest.schema');
module.exports = {
    sendFriendRequest: async (req, res) => {
        try {
            const { recipientId } = req.params;
            console.log("req.user", req.user);
            const senderId = req.user._id;
            const existingRequest = await FriendRequest.findOne({
                sender: senderId,
                receiver: recipientId,
                status: 'pending',
            });
            if (existingRequest) {
                return res.status(400).json({ message: 'Friend request already sent.' });
            }
            const friendRequest = new FriendRequest({
                sender: senderId,
                receiver: recipientId,
                status: 'pending',
            });
            await friendRequest.save();
            return res.status(201).json({ message: 'Friend request sent.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to send friend request.' });
        }
    },
    getAllFriendRequests: async (req, res) => {
        try {
            const userId = req.user._id;
            const friendRequests = await FriendRequest.find({
                receiver: userId,
                status: 'pending',
            });
            if (friendRequests.length === 0) return res.status(200).json({ message: "No New Requests" })
            return res.status(200).json({ friendRequests });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to list friend requests.' });
        }
    },
    acceptFriendRequest: async (req, res) => {
        try {
            const { requestId } = req.params;
            const userId = req.user._id;
            const friendRequest = await FriendRequest.findById(requestId);
            if (!friendRequest || friendRequest.receiver.toString() !== userId.toString() || friendRequest.status !== 'pending') {
                return res.status(400).json({ message: 'Invalid friend request.' });
            }
            friendRequest.status = 'accepted';
            await friendRequest.save();
            return res.status(200).json({ message: 'Friend request accepted.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to accept friend request.' });
        }
    },
    getFriendsList: async (req, res) => {
        try {
            const userId = req.user._id;
            const friends = await FriendRequest.find({
                $or: [
                    { sender: userId, status: 'accepted' },
                    { receiver: userId, status: 'accepted' },
                ],
            });
            return res.status(200).json({ friends });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to list friends.' });
        }
    }
}