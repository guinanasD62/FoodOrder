"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/ui/restaurant/pages/idUpdate/Update.Resto.module.css";
import Link from "next/link";
import RestoNavbar from "@/ui/restaurant/RestoNavBar/RestoNavBar";

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
    const [userId, setUserId] = useState<string | null>(null);

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
            owner: userId,
        };

        try {
            await axios.put(`http://localhost:3007/updaterestaurant/${id}`, updatedRestaurant);
            alert("Restaurant updated successfully");
            router.push(`/restaurant/${id}`);
        } catch (error) {
            console.error("Failed to update restaurant", error);
            setError("Failed to update restaurant");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!restaurant) return <div>Restaurant not found</div>;

    const handleVisit = () => {
        router.push(`/restaurant/${restaurant?._id}/menuItems?restaurantId=${restaurant?._id}`);
    };

    return (
        <>
            <RestoNavbar setUserId={setUserId} />
            <div className={styles.container}>
                <h4>Update Restaurant</h4>
                <label>
                    <input type="text" name="name" className={styles.brand} defaultValue={restaurant.name} />
                </label>

                <form onSubmit={handleUpdate} className={styles.form}>
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
                    <div className={styles.button}>
                        <Link href={`/administrator`} passHref>
                            <button type="button" className={styles.addButton}>Back Administrator</button>
                        </Link>

                        <button type="button" className={styles.visitButton} onClick={handleVisit}>
                            Visit Restaurant
                        </button>
                    </div>
                    <button type="submit" className={`${styles.addButton} ${styles.button}`}>
                        Update Restaurant
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateResto;
