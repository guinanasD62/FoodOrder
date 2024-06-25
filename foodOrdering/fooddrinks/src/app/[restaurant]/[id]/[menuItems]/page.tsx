"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from '@/ui/restaurant/pages/menuItems/MenuItems.module.css';
import MenuitemsNavbar from "@/ui/restaurant/MenuitemsNavbar/MenuitemsNavbar";

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

// interface Restaurant {
//     _id: string;
//     name: string;
//     email: string;
//     address: string;
//     phone: number;
//     owner: string;
//     createdAt: string;
//     updatedAt: string;
// }

const RestoMenuItem = () => {
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get('restaurantId');
    const ownerId = searchParams.get('ownerId');

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    // const [restaurant, setRestaurant] = useState<Restaurant[]>([]);
    // const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

    // display resto
    // useEffect(() => {
    //     const fetchRestaurants = async () => {
    //         try {
    //             const response = await axios.get<{ data: Restaurant[] }>('http://localhost:3007/getrestaurants');
    //             setRestaurant(response.data.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Failed to fetch restaurants", error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchRestaurants();
    // }, []);

    // useEffect(() => {
    //     if (restaurantId) {
    //         const filtered = restaurant.filter(resto => resto._id === restaurantId);
    //         setFilteredRestaurants(filtered);
    //     }
    // }, [restaurantId, restaurant]);

    const fetchMenuItems = async () => {
        try {
            console.log("Fetching menu items...");
            const response = await axios.get('http://localhost:3007/getmenus');
            console.log("Fetched data:", response.data.data);
            const allMenuItems = response.data.data;
            const filteredMenuItems = allMenuItems.filter((menuItem: MenuItem) => menuItem.restaurant === restaurantId);
            setMenuItems(filteredMenuItems);
        } catch (error) {
            console.error("Error fetching menu items", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3007/deletemenu/${id}`);
            setMenuItems(menuItems.filter(menuItem => menuItem._id !== id));
            alert("Menu deleted successfully");
        } catch (error) {
            console.error('Failed to delete menu', error);
        }
    };

    const handleUpdate = (menuItemId: string) => {
        console.log(`Navigating to menu item with id: ${menuItemId} for restaurant: ${restaurantId}`);
        router.push(`/restaurant/${restaurantId}/menuItems/${menuItemId}?restaurantId=${restaurantId}&menuItemId=${menuItemId}`);
    };

    useEffect(() => {
        if (restaurantId) {
            fetchMenuItems();
        } else {
            console.warn("No restaurantId found in searchParams");
            setLoading(false);
        }
    }, [restaurantId]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <><MenuitemsNavbar />
            <div className={styles.adminContainer}>
                <h1>Restaurant Menus</h1>
                {/* <div>
                {filteredRestaurants.map((restaurant) => (
                    <div key={restaurant._id}>
                        <p>Resto name: {restaurant.name}</p>
                    </div>
                ))}
                <p>Filtered by Restaurant ID: {restaurantId}</p>
            </div> */}

                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr>
                            {/* <th>image</th> */}
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {menuItems.map((menuItem) => (
                            <tr key={menuItem._id} className={styles.tableRow}>
                                {/* <td>{menuItem.img}</td> */}
                                <td>{menuItem.name}</td>
                                <td>{menuItem.description}</td>
                                <td>{menuItem.price}</td>
                                <td>{menuItem.quantity}</td>
                                <td>{menuItem.category}</td>
                                <td>
                                    <div>
                                        <button className={styles.updateButton} onClick={() => handleUpdate(menuItem._id)}>
                                            Update
                                        </button>
                                        <button className={styles.deleteButton} onClick={() => handleDelete(menuItem._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.addButtonContainer}>
                    {/* <Link href={`/administrator`} passHref>
                    <button type="button" className={styles.addButton}>
                    Back Administrator</button>
                </Link> */}
                    <Link href={`/restaurant/${restaurantId}/menuItems/addMenuItem?restaurantId=${restaurantId}`}>

                        <button className={styles.addButton}>
                            Add New Menu</button>
                    </Link>
                </div>
            </div></>
    );
};

export default RestoMenuItem;
