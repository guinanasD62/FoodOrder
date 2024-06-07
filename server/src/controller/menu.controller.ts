import { Request, Response } from "express";
import { MenuModel } from "../model/menuItem";


// Register user
export const addmenu = async (req: Request, res: Response) => {
    try {
        const { restaurant,
            foodname,
            recipes,
            price,
            quantity,
            img
        } = req.body;

        const menu = new MenuModel({
            restaurant,
            foodname,
            recipes,
            price,
            quantity,
            img

        });

        await menu.save();
        return res.status(201).json({ message: "New menu created!", data: menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating menu" });
    }
};

// Get all users
export const getAllMenu = async (req: Request, res: Response) => {
    try {
        const menu = await MenuModel.find();
        return res.status(200).json({ data: menu });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching menu" });
    }
};

// Get one user
export const getMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const menu = await MenuModel.findById(id);
        return res.status(200).json({ data: menu });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching menu" });
    }
};

// Update user
export const updateMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const menu = await MenuModel.findByIdAndUpdate(id, req.body);

        if (!menu) {
            return res.status(404).json({ message: "No menu found." });
        }

        const updatedMenu = await MenuModel.findById(id);
        res.status(200).json(updatedMenu);
    } catch (error) {
        res.status(500).json({ message: "Error updating menu" });
    }
};

// Delete user
export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const menu = await MenuModel.findByIdAndDelete({ _id: id });

        if (!menu) {
            return res.status(404).json({ message: "No menu found." });
        }

        return res.status(200).json({ message: "Menu deleted!", data: menu });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error deleting menu" });
    }
};
