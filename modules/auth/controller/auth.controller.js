const bcrypt = require('bcrypt');
const User = require('./../../users/models/user.schema');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY);
            return res.json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Login failed' });
        }
    },
    register: async (req, res) => {
        try {
            const { name, email, password, profilePicture, department, about, hobbies } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                profilePicture,
                department,
                about,
                hobbies,
            });
            await newUser.save();
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Registration failed' });
        }
    },
}