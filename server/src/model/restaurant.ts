import mongoose from "mongoose"

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter restaurant name"],
    },
    email: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
        required: [true, "Please enter address name"],
    },
    phone: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    menu: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuItem",
        }
    ]
}, {
    timestamps: true
})
//name desc price restaurantR imgUlr category
// restaurant : name address phone owner R to user|| admin, 
//rel wih menu
//restoschema ref menuItem 

export const RestaurantModel = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);