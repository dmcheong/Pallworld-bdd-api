const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    totalAmount: { 
        type: Number, 
        required: true 
    },
    items: [
        {
        productName: { type: 
            String, 
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true 
        },
        },
    ],
    shippingAddress: {
        name: String,
        street: String,
        city: String,
        postalCode: String,
    },
    imageGenerated: { 
        type: String 
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
