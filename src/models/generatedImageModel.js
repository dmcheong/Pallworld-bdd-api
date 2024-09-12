const mongoose = require('mongoose');

const generatedImageSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    imageUrl: { 
        type: String, 
        required: true 
    },
    promptUsed: { 
        type: String 
    },
    dateGenerated: { 
        type: Date, 
        default: Date.now 
    },
});

const GeneratedImage = mongoose.model('GeneratedImage', generatedImageSchema);
module.exports = GeneratedImage;
