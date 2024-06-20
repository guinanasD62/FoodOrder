"use client";

import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '@/ui/restaurant/pages/updateMenuItem/UpdateMenu.module.css'
import MenuitemsNavbar from '@/ui/restaurant/MenuitemsNavbar/MenuitemsNavbar';

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

const UpdateMenuItemFromResto = () => {
    const searchParams = useSearchParams();
    const menuItemId = searchParams.get('menuItemId');
    const restaurantId = searchParams.get('restaurantId');
    const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchMenuItem = async (id: string): Promise<MenuItem> => {
        try {
            const response = await axios.get(`http://localhost:3007/getmenu/${id}`);
            console.log("response--------->", response);
            return response.data.data;
        } catch (error) {
            throw new Error("Failed to fetch menuItem");
        }
    };

    useEffect(() => {
        if (!menuItemId) {
            setError("No menu item ID found in params");
            setLoading(false);
            return;
        }

        const loadMenuItem = async () => {
            try {
                console.log(`Fetching menu item with id: ${menuItemId}`);
                const data = await fetchMenuItem(menuItemId);
                console.log('Fetched menu item data:', data);
                setMenuItem(data);
            } catch (error) {
                console.error("Error fetching menu item:", error);
                setError("Failed to fetch menuItem");
            } finally {
                setLoading(false);
            }
        };
        loadMenuItem();
    }, [menuItemId]);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!menuItem) return;

        const formData = new FormData(e.currentTarget);
        const updatedMenuItem = {
            name: formData.get("name")?.toString() || menuItem.name,
            description: formData.get("description")?.toString() || menuItem.description,
            price: formData.get("price") ? Number(formData.get("price")) : menuItem.price,
            quantity: formData.get("quantity") ? Number(formData.get("quantity")) : menuItem.quantity,
            img: formData.get("img")?.toString() || menuItem.img,
            restaurant: restaurantId || menuItem.restaurant,
            category: formData.get("category")?.toString() || menuItem.category,
        };

        try {
            await axios.put(`http://localhost:3007/updatemenu/${menuItemId}`, updatedMenuItem);
            alert("Menu Item updated successfully");
            router.push(`/restaurant/${restaurantId}`);
        } catch (error) {
            console.error("Failed to update menu item", error);
            setError("Failed to update menu item");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!menuItem) return <div>Menu item not found</div>;


    return (
        <><MenuitemsNavbar />
            <div className={styles.container}>
                <h1> Update Menu Item</h1>
                <form onSubmit={handleUpdate} className={styles.form}>
                    <label className={styles.label}>
                        Name:
                        <input type="text" name="name" defaultValue={menuItem.name} className={styles.input}></input>
                    </label>


                    <label className={styles.label}>
                        Price:
                        <input type="number" name="price" defaultValue={menuItem.price} className={styles.input}></input>
                    </label>

                    <label className={styles.label}>
                        Quantity:
                        <input type="number" name="quantity" defaultValue={menuItem.quantity} className={styles.input}></input>
                    </label>

                    <label className={styles.label}>
                        Category:
                        <input type="text" name="category" defaultValue={menuItem.category} className={styles.input}></input>
                    </label>

                    <label className={styles.label}>
                        Description:
                        <textarea name="description" defaultValue={menuItem.description} className={styles.textarea}></textarea>
                    </label>

                    <input type="hidden" name="restaurant" defaultValue={menuItem.restaurant}></input>

                    <button type="submit" className={styles.addButton}>Update Menu Item</button>
                </form>
            </div></>
    );
};

export default UpdateMenuItemFromResto;
