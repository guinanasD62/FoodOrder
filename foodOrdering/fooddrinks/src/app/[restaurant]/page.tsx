"use client"

import RestoNavbar from '@/ui/restaurant/RestoNavBar/RestoNavBar'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import Link from 'next/link';

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
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    // const router = useRouter();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get<{ data: Restaurant[] }>('http://localhost:3007/getrestaurants');
                setRestaurants(response.data.data);
            } catch (error) {
                setError('Failed to fetch restaurants');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (userId) {
            const filtered = restaurants.filter(restaurant => restaurant.owner === userId);
            setFilteredRestaurants(filtered);
        }
    }, [restaurants, userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <RestoNavbar setUserId={setUserId} />

            <div>
                <Link href="/${restaurant}/addRestaurant" passHref>
                    <button>Add New</button>
                </Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Owner</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredRestaurants.map((restaurant) => (
                        <tr key={restaurant._id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.email}</td>
                            <td>{restaurant.address}</td>
                            <td>{restaurant.phone}</td>
                            <td>{restaurant.owner}</td>
                            <td>{new Date(restaurant.createdAt).toLocaleDateString()}</td>
                            <td>{new Date(restaurant.updatedAt).toLocaleDateString()}</td>
                            <td>
                                <button></button>


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminRestaurants;
