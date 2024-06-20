
"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/ui/restaurant/RestaurantAdmin.module.css";
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

const RestaurantPage = () => {
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
        <div className={styles.container}>
            <h1 className={styles.header}>Restaurant Menus</h1>
            <div className={styles.top}>
                <Search placeholder="Search for a menu ..." />

                {/* <Link href="/dashboard/products/add">
                    <button className={styles.button}>Add New</button>
                </Link> */}
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Description</th>
                            <th className={styles.th}>Price</th>
                            <th className={styles.th}>Quantity</th>
                            <th className={styles.th}>Restaurant</th>
                            <th className={styles.th}>Category</th>
                            <th className={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map((menuItem) => (
                            <tr key={menuItem._id}>
                                <td className={styles.td}>{menuItem.name}</td>
                                <td className={styles.td}>{menuItem.description}</td>
                                <td className={styles.td}>{menuItem.price}</td>
                                <td className={styles.td}>{menuItem.quantity}</td>
                                <td className={styles.td}>{menuItem.restaurant}</td>
                                <td className={styles.td}>{menuItem.category}</td>
                                <td className={styles.td}>
                                    <div className={styles.buttons}>
                                        {/* <button className={styles.update}>Update</button> */}
                                        <button className={styles.button}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RestaurantPage;
