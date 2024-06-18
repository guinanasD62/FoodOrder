"use client";

import RestoNavbar from "@/ui/restaurant/RestoNavBar/RestoNavBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/ui/restaurant/pages/idUpdate/Update.Resto.module.css";
import Link from "next/link";
import RestoMenuItem from "./[menuItems]/page";


interface RestaurantData {
    _id: string;
    name: string;
    email: string;
    address: string;
    phone: number;
    owner: string;
    createdAt: string;
    updatedAt: string;
}

interface Params {
    id: string;
}

const UpdateResto = ({ params }: { params: Params }) => {
    const { id } = params;
    const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchRestaurant = async (id: string): Promise<RestaurantData> => {
        const response = await axios.get(`http://localhost:3007/getrestaurant/${id}`);
        return response.data.data;
    };

    useEffect(() => {
        if (!id) return;

        const loadRestaurant = async () => {
            try {
                const data = await fetchRestaurant(id);
                setRestaurant(data);
            } catch (error) {
                setError("Failed to fetch restaurant");
            } finally {
                setLoading(false);
            }
        };

        loadRestaurant();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!restaurant) return;

        const formData = new FormData(e.currentTarget);
        const updatedRestaurant = {
            name: formData.get("name")?.toString() || restaurant.name,
            email: formData.get("email")?.toString() || restaurant.email,
            address: formData.get("address")?.toString() || restaurant.address,
            phone: formData.get("phone")?.toString() || restaurant.phone,
            owner: formData.get("owner")?.toString() || restaurant.owner,
        };

        try {
            const response = await axios.put(`http://localhost:3007/updaterestaurant/${id}`, updatedRestaurant);
            alert("Restaurant updated successfully");
            router.push(`/restaurant`);
        } catch (error) {
            console.error("Failed to update restaurant", error);
            setError("Failed to update restaurant");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!restaurant) return <div>Restaurant not found</div>;

    const handleVisit = (id: string) => {
        router.push(`/restaurant/${id}/menuItems`);
    };

    return (
        <>
            <div className={styles.container}>
                <h1>Update Restaurant</h1>
                <form onSubmit={handleUpdate} className={styles.form}>
                    <label>
                        Name:
                        <input type="text" name="name" defaultValue={restaurant.name} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" defaultValue={restaurant.email} />
                    </label>
                    <br />
                    <label>
                        Address:
                        <input type="text" name="address" defaultValue={restaurant.address} />
                    </label>
                    <br />
                    <label>
                        Phone:
                        <input type="text" name="phone" defaultValue={restaurant.phone.toString()} />
                    </label>
                    <br />
                    <label>
                        Owner:
                        <input type="text" name="owner" defaultValue={restaurant.owner} />
                    </label>
                    <br />
                    <div className={styles.button}>
                        <button type="submit" className={styles.addButton}>
                            Update Restaurant
                        </button>
                        <button type="button" className={styles.visitButton} onClick={() => handleVisit(restaurant._id)}>
                            Visit Restaurant
                        </button>
                    </div>
                </form>
                <div>
                    <p>Restaurant ID: {restaurant._id}</p>
                    <p>Owner ID: {restaurant.owner}</p>
                </div>
                <RestoMenuItem restaurantId={restaurant._id} ownerId={restaurant.owner} /> {/* Pass the IDs to RestoMenuItem */}
            </div>
        </>
    );
};

export default UpdateResto;
