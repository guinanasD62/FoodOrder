import mongoose from "mongoose";


const connectDB = async () => {

    try {
        await mongoose.connect(
            "mongodb+srv://dianaroseguinanas:dianaroseguinanas@cluster0.hhqfg3z.mongodb.net/foodorder?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        }
        )
        console.log("Connected to database!");


    } catch (error) {
        console.error("Connection db failed", error.message);
    }

}
module.exports = connectDB;

/*
The options { useNewUrlParser: true, useUnifiedTopology: true } are passed to avoid deprecation warnings:

useNewUrlParser: true tells Mongoose to use the new URL string parser instead of the old one.

useUnifiedTopology: true enables the new unified topology layer which removes support for several connection options that are no longer relevant with the new topology engine.

*/