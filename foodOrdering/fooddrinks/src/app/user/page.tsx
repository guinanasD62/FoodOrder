"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Slideshow from '@/ui/user/headBanner/UserMenu';
import Navbar from '@/ui/user/navbar/NarBar';
import Search from "@/ui/restaurant/Search/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const UsersPage = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:3007/getmenus');
            console.log("Fetched data:", response.data.data); // Debugging log
            const sortedMenuItems = response.data.data.sort((a: MenuItem, b: MenuItem) => {
                if (a.restaurant && b.restaurant) {
                    return a.restaurant.localeCompare(b.restaurant);
                }
                console.warn("Undefined restaurant in menu items", a, b); // Warn if undefined
                return 0;
            });
            setMenuItems(sortedMenuItems);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching menu items", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

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
                <div>
                    <Search placeholder="Search for a menu ..." />
                </div>
                <div>
                    <ImageList sx={{ width: 500, height: 450 }}>
                        {menuItems.map((item) => (
                            <ImageListItem key={item._id}>
                                <img
                                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    alt={item.name}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={item.name}
                                    subtitle={<span>Price: ${item.price}</span>}
                                    position="below"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                {/* <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Restaurant</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuItems.map((menuItem) => (
                                <tr key={menuItem._id}>
                                    <td>{menuItem.name}</td>
                                    <td>{menuItem.description}</td>
                                    <td>{menuItem.price}</td>
                                    <td>{menuItem.quantity}</td>
                                    <td>{menuItem.restaurant}</td>
                                    <td>{menuItem.category}</td>
                                    <td>
                                        <div>
                                            <button>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}
            </div>
        </>
    );
};

export default UsersPage;
