const GeneratedImage = require('../../models/generatedImageModel');

const getGeneratedImagesByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const images = await GeneratedImage.find({ userId }).sort({ dateGenerated: -1 });

        res.status(200).json({
            images
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des images générées.' });
    }
};

module.exports = getGeneratedImagesByUserId;
