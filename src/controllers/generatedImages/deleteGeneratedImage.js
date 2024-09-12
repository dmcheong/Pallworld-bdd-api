const GeneratedImage = require('../../models/generatedImageModel');

const deleteGeneratedImage = async (req, res) => {
    const { imageId } = req.params;

    try {
        await GeneratedImage.findByIdAndDelete(imageId);
        res.status(200).json({ message: 'Image supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'image.' });
    }
};

module.exports = deleteGeneratedImage;
