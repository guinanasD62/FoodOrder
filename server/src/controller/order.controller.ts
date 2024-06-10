import { Request, Response } from "express";
import { OrderModel } from "../model/order";
import { User } from "../model/user";
import { MenuModel } from "../model/menuItem";

// Add order
export const addOrder = async (req: Request, res: Response) => {
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

        const order = new OrderModel({
            customer,
            items,
            totalAmount
        });

        await order.save();
        return res.status(201).json({ message: "New order created!", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating order" });
    }
};

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await OrderModel.find().populate('customer items.menuItem');
        return res.status(200).json({ data: orders });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching orders" });
    }
};

// Get one order
export const getOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findById(id).populate('customer items.menuItem');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ data: order });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error fetching order" });
    }
};

// Update order
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findByIdAndUpdate(id, req.body, { new: true }).populate('customer items.menuItem');

        if (!order) {
            return res.status(404).json({ message: "No order found." });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error updating order" });
    }
};

// Delete order
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ message: "No order found." });
        }

        return res.status(200).json({ message: "Order deleted!", data: order });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error deleting order" });
    }
};
