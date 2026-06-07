const express = require('express');
const { addFavorite, getFavorites } = require('../controllers/userController');
const router = express.Router();

router.post('/favorites', addFavorite);
router.get('/favorites/:userId', getFavorites);

module.exports = router;