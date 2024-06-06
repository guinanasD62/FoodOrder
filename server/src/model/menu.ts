import mongoose from "mongoose"

const menuSchema = new mongoose.Schema({
    restaurant: {
        type: String,
        required: [true, "Please enter restaurant name"],

    },
    foodname: {
        type: String,
        required: [true, "Please enter food name"],
        min: 5,
    },
    recipes: {
        type: String,
        required: [true, "Please put recipes."],
        min: 5,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    img: {
        type: String,
    }
}, {
    timestamps: true,
});


export const MenuModel = mongoose.models.Menu || mongoose.model("Menu", menuSchema);
