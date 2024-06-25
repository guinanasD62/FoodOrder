"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import styles from "@/ui/restaurant/pages/add/AddResto.module.css";
import MenuitemsNavbar from "@/ui/restaurant/MenuitemsNavbar/MenuitemsNavbar";

const AddMenuItemResto = () => {
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get('restaurantId');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
    });

    const [image, setImage] = useState<File | null>(null);

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const token = useSelector((state: RootState) => state.session.token);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors(prev => ({ ...prev, [name]: value ? '' : `Please fill the ${name} field.` }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        Object.keys(formData).forEach(key => {
            if (!formData[key as keyof typeof formData]) {
                newErrors[key] = `Please fill the ${key} field.`;
            }
        });

        if (!restaurantId) {
            setError("Restaurant ID is not set");
            return;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // const menuItemData = {
        //     ...formData,
        //     price: Number(formData.price),
        //     restaurant: restaurantId,
        //     quantity: Number(formData.quantity),
        // };

        const menuItemData = new FormData();
        menuItemData.append('name', formData.name);
        menuItemData.append('description', formData.description);
        menuItemData.append('price', formData.price);
        menuItemData.append('quantity', formData.quantity);
        menuItemData.append('category', formData.category);
        menuItemData.append('restaurant', restaurantId);
        if (image) {
            menuItemData.append('img', image);
        }

        console.log("restaurantId---->", restaurantId);
        try {
            await axios.post("http://localhost:3007/addmenu", menuItemData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            alert("Menu item added successfully");
            router.push(`/restaurant/${restaurantId}`);
        } catch (err) {
            console.error("Failed to add menu item", err);
            setError("Failed to add menu item");
        }
    };

    return (
        <>
            <MenuitemsNavbar />
            <div className={styles.container}>
                <h1>Add new Menu Item</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange} />
                        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                    </div>

                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange} />
                        {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange} />
                        {errors.quantity && <div style={{ color: 'red' }}>{errors.quantity}</div>}
                    </div>
                    <div>
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange} />
                        {errors.category && <div style={{ color: 'red' }}>{errors.category}</div>}
                    </div>

                    <div>
                        <label htmlFor="description">Description:</label>
                        <input
                            className={styles.textarea}
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange} />
                        {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}
                    </div>

                    <div>
                        <label htmlFor="img">Image:</label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            accept="image/*"
                            onChange={handleFileChange} />
                    </div>

                    <button type="submit" className={styles.addButton}>Add Menu Item</button>
                </form>
            </div>
        </>
    );
};

export default AddMenuItemResto;
