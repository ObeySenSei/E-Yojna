const User = require('../models/User');

const addFavorite = async (req, res) => {
    try {
        const { userId, schemeId } = req.body;
        const user = await User.findById(userId);
        
        if (!user.favorites.includes(schemeId)) {
            user.favorites.push(schemeId);
            await user.save();
        }
        
        res.json({ success: true, favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('favorites');
        res.json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addFavorite, getFavorites };