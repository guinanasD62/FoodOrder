"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Slideshow from '@/ui/user/headBanner/UserMenu';
import Navbar from '@/ui/user/navbar/NarBar';

import { useRouter } from "next/navigation";
import style from '@/ui/user/userMain/userFoodCard.module.css';

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

interface Restaurant {
    _id: string;
    name: string;
    email: string;
    address: string;
    phone: number;
    owner: string;
}

const UsersFoodPage = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:3007/getmenus');
                console.log("Fetched menu items:", response.data.data); // Debug log
                setMenuItems(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("failed to fetch menu Items", error);
                setLoading(false);
            }
        };
        fetchMenuItems();
    }, []);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('http://localhost:3007/getrestaurants');
                console.log("Fetched restaurants:", response.data.data); // Debug log
                setRestaurants(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("failed to fetch restaurants", error);
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    const getRestaurantName = (restaurantId: string) => {
        const restaurant = restaurants.find(resto => resto._id === restaurantId);
        console.log("Finding restaurant for ID:", restaurantId, "Result:", restaurant); // Debug log
        return restaurant ? restaurant.name : "Unknown Restaurant";
    }

    const router = useRouter();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <Slideshow />
            <div>
                <h1>Restaurant Menus</h1>
                <div className={style.gridContainer}>
                    {restaurants.map((restaurant) => (
                        <div className={style.restaurantContainer} key={restaurant._id}>
                            <h2 className={style.nameBanner}>{restaurant.name}</h2>
                            <div className={style.cardContainer}>
                                {menuItems.filter(menuItem => menuItem.restaurant === restaurant._id).map((menuItem) => (
                                    <div className={style.card} key={menuItem._id}>
                                        <img src='/pizzas.png' alt="Pizza" className={style.image} />
                                        <div className={style.content}>
                                            {/* <h6>{getRestaurantName(menuItem.restaurant)}</h6> */}
                                            <h2>{menuItem.name}</h2>
                                            <p>{menuItem.description}</p>
                                            <p className={style.price}>${menuItem.price}</p>
                                            <button className={style.button}>Add to Cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UsersFoodPage;
