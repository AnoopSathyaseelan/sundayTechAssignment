const User = require('../../users/models/user.schema');

module.exports = {
    allUsers: async (req, res) => {
        try {
            const users = await User.find({}, 'name email');
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server error" })
        }
    }
}