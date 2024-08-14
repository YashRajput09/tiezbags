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
        filename: String,
        // default: "https://t3.ftcdn.net/jpg/00/36/94/26/240_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg",
        // set: (v)=> v === "" ? "https://t3.ftcdn.net/jpg/00/36/94/26/240_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg" : v,
        // required: true,
    },
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;