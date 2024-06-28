"use client";

import RestoNavbar from '@/ui/restaurant/RestoNavBar/RestoNavBar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store
import styles from '@/ui/restaurant/pages/Main/MainResto.module.css';
import withRole from '@/auth/withRole';

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

const AdminRestaurants = () => {
    const [restaurant, setRestaurant] = useState<Restaurant[]>([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();
    const token = useSelector((state: any) => state.session.token); // Access the token from the Redux store

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get<{ data: Restaurant[] }>('http://localhost:3007/getrestaurants', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the authorization header
                    },
                });
                setRestaurant(response.data.data);
            } catch (error) {
                setError('Failed to fetch restaurants');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [token]);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3007/deleterestaurant/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the authorization header
                },
            });
            setRestaurant(restaurant.filter(restaurant => restaurant._id !== id));
            alert("Restaurant deleted successfully");
        } catch (err) {

            console.error('Failed to delete restaurant', err);
            router.push(`/forbidden`);
            setError('Failed to delete restaurant');
        }
    };

    const handleUpdate = (id: string) => {
        router.push(`/restaurant/${id}`);
    };

    useEffect(() => {
        if (userId) {
            const filtered = restaurant.filter(restaurant => restaurant.owner === userId);
            setFilteredRestaurants(filtered);
        }
    }, [restaurant, userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <RestoNavbar setUserId={setUserId} />

            <div className={styles.adminContainer}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            {/* <th>Owner</th> */}
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {filteredRestaurants.map((restaurant) => (
                            <tr key={restaurant._id} className={styles.tableRow}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.email}</td>
                                <td>{restaurant.address}</td>
                                <td>{restaurant.phone}</td>
                                {/* <td>{restaurant.owner}</td> */}
                                <td>{new Date(restaurant.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(restaurant.updatedAt).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        onClick={() => handleUpdate(restaurant._id)}
                                        className={styles.updateButton}
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDelete(restaurant._id)}
                                        className={styles.deleteButton}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.addButtonContainer}>
                    <Link href="/${restaurant}/addRestaurant" passHref>
                        <button className={styles.addButton}>Add New Restaurant</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default withRole(AdminRestaurants, 'admin');
