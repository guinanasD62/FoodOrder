import { Request, Response } from "express";
import { RestaurantModel } from "../model/restaurant";
import { User } from "../model/user";

// Add restaurant
export const addRestaurant = async (req: Request, res: Response) => {
    try {
        const { name, email, address, phone, owner, menu } = req.body;

        // Check if the owner exists
        const ownerExists = await User.findById(owner);
        if (!ownerExists) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const restaurant = new RestaurantModel({
            name,
            email,
            address,
            phone,
            owner,
            menu
        });

        await restaurant.save();
        return res.status(201).json({ message: "New restaurant created!", data: restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating restaurant" });
    }
};

// Get all restaurants
export const getAllRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await RestaurantModel.find();
        return res.status(200).json({ data: restaurants });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching restaurants" });
    }
};

// Get one restaurant
export const getRestaurant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const restaurant = await RestaurantModel.findById(id);
        return res.status(200).json({ data: restaurant });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching restaurant" });
    }
};

// Update restaurant
export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const restaurant = await RestaurantModel.findByIdAndUpdate(id, req.body);

        if (!restaurant) {
            return res.status(404).json({ message: "No restaurant found." });
        }

        const updatedRestaurant = await RestaurantModel.findById(id);
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ message: "Error updating restaurant" });
    }
};

// Delete restaurant
export const deleteRestaurant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const restaurant = await RestaurantModel.findByIdAndDelete(id);

        if (!restaurant) {
            return res.status(404).json({ message: "No restaurant found." });
        }

        return res.status(200).json({ message: "Restaurant deleted!", data: restaurant });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error deleting restaurant" });
    }
};
