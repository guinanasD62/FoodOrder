"use client";

import RestoNavbar from '@/ui/restaurant/RestoNavBar/RestoNavBar';
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent } from 'react';
import axios from 'axios';

interface RestaurantData {
    name: string;
    email: string;
    address: string;
    phone: number;
    owner: string;
    createdAt: string;
}

const AddRestaurant = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const restaurantData: RestaurantData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            address: formData.get('address') as string,
            phone: Number(formData.get('phone')),
            owner: userId!,
            createdAt: new Date().toISOString(),
        };

        try {
            await axios.post("http://localhost:3007/addrestaurant", restaurantData);
            router.push("/${restaurant}");
        } catch (err) {
            console.error("Failed to add restaurant", err);
            setError("Failed to add restaurant");
        }
    };

    return (
        <div>
            <RestoNavbar setUserId={setUserId} />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" required />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="number" id="phone" name="phone" required />
                </div>
                <button type="submit">Add Restaurant</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default AddRestaurant;
