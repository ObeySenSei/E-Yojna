const express = require('express');
const { getSchemes, searchSchemes, createScheme, deleteScheme } = require('../controllers/schemeController');
const router = express.Router();

router.get('/', getSchemes);
router.get('/search', searchSchemes);
router.post('/', createScheme);
router.delete('/:id', deleteScheme);

module.exports = router;