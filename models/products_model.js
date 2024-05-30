const mongoose = require('mongoose');
// const owner_model = require('./owner_model');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
    },
    image: {
        url: String,
        // required: true,
    },
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Owner",
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;