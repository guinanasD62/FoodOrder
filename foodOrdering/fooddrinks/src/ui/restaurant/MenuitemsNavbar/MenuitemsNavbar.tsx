"use client"

import LogoutButton from "@/ui/forAll/LogoutBtn/LogoutBtn";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './MenuitemsNavBar.module.css';

interface Restaurant {
    _id: string;
    name: string;
    email: string;
    address: string;
    phone: number;
    owner: string;
    createdAt: string;
    updatedAt: string;
}

const MenuitemsNavbar = () => {
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get('restaurantId');
    const [restaurant, setRestaurant] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get<{ data: Restaurant[] }>('http://localhost:3007/getrestaurants');
                setRestaurant(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch restaurants", error);
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (restaurantId) {
            const filtered = restaurant.filter(resto => resto._id === restaurantId);
            setFilteredRestaurants(filtered);
        }
    }, [restaurantId, restaurant]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.appBar}>
            <div className={styles.containerNav}>
                <div className={styles.title}>
                    {filteredRestaurants.map((restaurant) => (
                        <div key={restaurant._id}>
                            <p> {restaurant.name}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.containerCustomer}>
                    <p>Restaurant ID: {restaurantId}</p>

                    <div>
                        <Link href={`/administrator`} passHref>
                            <button type="button" className={styles.addButton}>Back Administrator</button>
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuitemsNavbar;
