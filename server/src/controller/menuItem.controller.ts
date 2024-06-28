import { Request, Response } from "express";
import { MenuModel } from "../model/menuItem";
import { RestaurantModel } from "../model/restaurant";



// Add menu item
export const addMenu = async (req: Request, res: Response) => {
    try {
        const { name, description, price, quantity, restaurant, category } = req.body;
        const img = req.file ? req.file.filename : undefined;

        console.log("Uploaded file:", req.file); // Add this line

        const restaurantExists = await RestaurantModel.findById(restaurant);

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
        console.log(`New menu item created with image: ${img}`);
        return res.status(201).json({ message: "New menu item created!", data: menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating menu item" });
    }
};


// Get all menu items

export const getAllMenu = async (req: Request, res: Response): Promise<Response<any>> => {
    try {
        const searchTerm = req.query.search as string;
        const query = searchTerm
            ? { name: { $regex: searchTerm, $options: "i" } }
            : {};

        const menus = await MenuModel.find(query);

        return res.status(200).json({ data: menus });
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
        const { id } = req.params;
        const { name, description, price, quantity, category, restaurant } = req.body;
        const img = req.file ? req.file.filename : undefined;

        const updateData: any = { name, description, price, quantity, category, restaurant };
        if (img) {
            updateData.img = img;
        }

        const menu = await MenuModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!menu) {
            return res.status(404).json({ message: "No menu item found." });
        }

        res.status(200).json(menu);
    } catch (error) {
        console.error("Error updating menu item:", error);
        res.status(500).json({ message: "Error updating menu item" });
    }
};

// Delete menu item
export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const { id, restaurant } = req.params;

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


