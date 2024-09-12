const GeneratedImage = require('../../models/generatedImageModel');

const createGeneratedImage = async (req, res) => {
    const { userId, imageUrl, promptUsed } = req.body;

    try {
        console.log('Tentative d\'enregistrement de l\'image:', { userId, imageUrl, promptUsed });

        const newImage = new GeneratedImage({
            userId,
            imageUrl,
            promptUsed,
        });

        const savedImage = await newImage.save();
        console.log('Image enregistrée avec succès:', savedImage);

        res.status(201).json(savedImage);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'image générée:', error);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'image générée.' });
    }
};


module.exports = createGeneratedImage;
