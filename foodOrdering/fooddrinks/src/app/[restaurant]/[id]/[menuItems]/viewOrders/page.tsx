"use client"

import MenuitemsNavbar from "@/ui/restaurant/MenuitemsNavbar/MenuitemsNavbar";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from '@/ui/restaurant/pages/menuItems/MenuItems.module.css'

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    role: string;
    created_at: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    img: string;
    restaurant: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Order {
    customer: Customer;
    items: {
        menuItem: MenuItem;
        quantity: number;
    }[];
    totalAmount: number;
    status: string;
    ordered_at: string;
}

const OrderPage = () => {
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get('restaurantId');

    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

    useEffect(() => {
        console.log("Restaurant ID in OrderPage:", restaurantId);
    }, [restaurantId]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3007/getorders');
                setOrders(response.data.data);
            } catch (error) {
                console.log("Error fetching orders", error);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        if (restaurantId) {
            const filtered = orders.filter(order =>
                order.items.some(item => item.menuItem.restaurant === restaurantId)
            );
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders);
        }
    }, [orders, restaurantId]);

    return (
        <div>
            <MenuitemsNavbar />
            <div className={styles.adminContainer}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total Amount</th>
                            <th>Ordered At</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {filteredOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.customer.name}</td>
                                <td>
                                    {order.items.filter(item => item.menuItem.restaurant === restaurantId).map((item, idx) => (
                                        <div key={idx}>
                                            {item.menuItem.name} - {item.quantity}
                                        </div>
                                    ))}
                                </td>
                                <td>{order.totalAmount}</td>
                                <td>{new Date(order.ordered_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderPage;
