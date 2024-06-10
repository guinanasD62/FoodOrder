import { Request, Response } from "express";
import { CartModel } from "../model/cart";
import { User } from "../model/user";
import { MenuModel } from "../model/menuItem";

// Add cart
export const addCart = async (req: Request, res: Response) => {
    try {
        const { customer, items, totalAmount } = req.body;

        // Check if the customer exists
        const customerExists = await User.findById(customer);
        if (!customerExists) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Validate each menuItem in items
        for (const item of items) {
            const menuItemExists = await MenuModel.findById(item.menuItem);
            if (!menuItemExists) {
                return res.status(404).json({ message: `Menu item not found: ${item.menuItem}` });
            }
        }

        const cart = new CartModel({
            customer,
            items,
            totalAmount
        });

        await cart.save();
        return res.status(201).json({ message: "New cart created!", data: cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating cart" });
    }
};

// Get all carts
export const getAllCarts = async (req: Request, res: Response) => {
    try {
        const carts = await CartModel.find().populate('customer items.menuItem');
        return res.status(200).json({ data: carts });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching carts" });
    }
};

// Get one cart
export const getCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cart = await CartModel.findById(id).populate('customer items.menuItem');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json({ data: cart });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching cart" });
    }
};

// Update cart
export const updateCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cart = await CartModel.findByIdAndUpdate(id, req.body, { new: true }).populate('customer items.menuItem');

        if (!cart) {
            return res.status(404).json({ message: "No cart found." });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error updating cart" });
    }
};

// Delete cart
export const deleteCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cart = await CartModel.findByIdAndDelete(id);

        if (!cart) {
            return res.status(404).json({ message: "No cart found." });
        }

        return res.status(200).json({ message: "Cart deleted!", data: cart });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error deleting cart" });
    }
};