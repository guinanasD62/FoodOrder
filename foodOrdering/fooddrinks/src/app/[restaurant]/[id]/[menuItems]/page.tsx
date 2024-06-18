"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import styles from "@/ui/restaurant/RestaurantAdmin.module.css";
import Search from "@/ui/restaurant/Search/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuItem {
    _id: string;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    img?: string;
    restaurant: string;
    category?: string;
}

interface RestoMenuItemProps {
    restaurantId: string;
    ownerId: string;
}

const RestoMenuItem = ({ restaurantId, ownerId }: RestoMenuItemProps) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:3007/getmenus');
            console.log("Fetched data:", response.data.data); // Debugging log
            const sortedMenuItems = response.data.data.sort((a: MenuItem, b: MenuItem) => {
                if (a.restaurant && b.restaurant) {
                    return a.restaurant.localeCompare(b.restaurant);
                }
                console.warn("Undefined restaurant in menu items", a, b); // Warn if undefined
                return 0;
            });
            setMenuItems(sortedMenuItems);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching menu items", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const router = useRouter();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Restaurant Menus</h1>
            <div>
                <p>Filtered by Restaurant ID: {restaurantId}</p>
                <p>Filtered by Owner ID: {ownerId}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Restaurant</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems
                        .filter(menuItem => menuItem.restaurant === restaurantId) // Filter by restaurantId
                        .map((menuItem) => (
                            <tr key={menuItem._id}>
                                <td>{menuItem.name}</td>
                                <td>{menuItem.description}</td>
                                <td>{menuItem.price}</td>
                                <td>{menuItem.quantity}</td>
                                <td>{menuItem.restaurant}</td>
                                <td>{menuItem.category}</td>
                                <td>
                                    <div>
                                        {/* <button className={styles.update}>Update</button> */}
                                        <button></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default RestoMenuItem;
