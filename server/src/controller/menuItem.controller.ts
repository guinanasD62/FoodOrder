import { Request, Response } from "express";
import { MenuModel } from "../model/menuItem";
import { RestaurantModel } from "../model/restaurant";



// Add menu item
export const addMenu = async (req: Request, res: Response) => {
    try {
        const { name, description, price, quantity, img, restaurant, category } = req.body;

        // Check if the restaurant exists
        const restaurantExists = await RestaurantModel.findById(restaurant);
        // console.log("resto ----------->", restaurant);
        // console.log("restaurantExists ----------->", restaurantExists);

        if (!restaurantExists) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const menu = new MenuModel({
            name,
            description,
            price,
            quantity,
            img,
            restaurant,
            category
        });

        await menu.save();
        return res.status(201).json({ message: "New menu item created!", data: menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating menu item" });
    }
};

// Get all menu items
export const getAllMenu = async (req: Request, res: Response) => {
    try {
        const menu = await MenuModel.find();
        return res.status(200).json({ data: menu });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching menu items" });
    }
};

// Get one menu item
export const getMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const menu = await MenuModel.findById(id);
        if (!menu) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        return res.status(200).json({ data: menu });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching menu item" });
    }
};

// Update menu item
export const updateMenu = async (req: Request, res: Response) => {
    try {
        const { id, restaurant } = req.params;

        const restaurantExists = await RestaurantModel.findById(restaurant);


        if (!restaurantExists) {
            return res.status(404).json({ message: "Restaurant not found" });
        }


        const menu = await MenuModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!menu) {
            return res.status(404).json({ message: "No menu item found." });
        }

        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Error updating menu item" });
    }
};

// Delete menu item
export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const { id, restaurant } = req.params;

        const restaurantExists = await RestaurantModel.findById(restaurant);
        if (!restaurantExists) {
            return res.status(404).json({ message: "Restaurant not found" });
        }


        const menu = await MenuModel.findByIdAndDelete(id);
        if (!menu) {
            return res.status(404).json({ message: "No menu item found." });
        }

        return res.status(200).json({ message: "Menu item deleted!", data: menu });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error deleting menu item" });
    }
};


