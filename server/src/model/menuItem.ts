import mongoose from "mongoose"

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],

    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: [true, "Please put price."],
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    img: {
        type: String,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    category: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});
//name desc price restaurantR imgUlr category
// restaurant : name address phone owner R to user|| admin, 
//rel wih menu
//restoschema ref menuItem 

export const MenuModel = mongoose.models.Menu || mongoose.model("MenuItem", menuItemSchema);
