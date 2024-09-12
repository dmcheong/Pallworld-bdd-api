const GeneratedImage = require('../../models/generatedImageModel');

const getGeneratedImagesByUserId = async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query; 

    try {
        const images = await GeneratedImage.find({ userId })
            .sort({ dateGenerated: -1 })
            .skip((page - 1) * limit) 
            .limit(parseInt(limit));  

        const totalImages = await GeneratedImage.countDocuments({ userId });

        res.status(200).json({
            images,
            totalImages,
            totalPages: Math.ceil(totalImages / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des images générées.' });
    }
};

module.exports = getGeneratedImagesByUserId;
