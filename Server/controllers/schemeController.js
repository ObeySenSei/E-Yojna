const Scheme = require('../models/scheme');

const getSchemes = async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchSchemes = async (req, res) => {
    try {
        const { q } = req.query;
        const schemes = await Scheme.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        });
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createScheme = async (req, res) => {
    try {
        const scheme = new Scheme(req.body);
        await scheme.save();
        res.status(201).json(scheme);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteScheme = async (req, res) => {
    try {
        await Scheme.findByIdAndDelete(req.params.id);
        res.json({ message: 'Scheme deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSchemes, searchSchemes, createScheme, deleteScheme };