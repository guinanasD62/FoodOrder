"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Slideshow from "@/ui/user/headBanner/UserMenu";
import Navbar from "@/ui/user/navbar/NarBar";
import { useRouter } from "next/navigation";
import style from "@/ui/user/userMain/userFoodCard.module.css";
import AddCartBtn from "@/ui/user/userMain/btn/AddCartBtn";
import { useDebounce } from "use-debounce";
import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material"; // Import TextField from Material-UI
//import withPermission from "@/auth/withPermission";

interface MenuItem {
    _id: string;
    id: string;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    img?: string;
    restaurant: string;
    restaurantId: string;
    category?: string;
    restaurantName?: string;
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
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(""); // Add searchTerm and setSearchTerm
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms debounce


    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get<{ data: MenuItem[] }>(
                    'http://localhost:3007/getmenus',
                    {
                        params: { search: debouncedSearchTerm },
                    }
                );

                const fetchedMenuItems = response.data.data.map((item: any) => ({
                    ...item,
                    id: item._id, // Map _id to id
                    restaurantId: item.restaurant // Map restaurant to restaurantId
                }));

                setMenuItems(fetchedMenuItems); // Update this line to use fetchedMenuItems
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch menu items", error);
                setLoading(false);
            }
        };
        fetchMenuItems();
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('http://localhost:3007/getrestaurants');
                console.log("Fetched restaurants:", response.data.data);
                setRestaurants(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch restaurants", error);
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    const getRestaurantName = (restaurantId: string) => {
        const restaurant = restaurants.find(resto => resto._id === restaurantId);
        console.log("Finding restaurant for ID:", restaurantId, "Result:", restaurant);
        return restaurant ? restaurant.name : "Unknown Restaurant";
    };

    const router = useRouter();

    // if (loading) {
    //     return (
    //         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //             <CircularProgress />
    //         </Box>
    //     );
    // }

    return (
        <>
            <Navbar setUserId={setUserId} />
            <Slideshow />
            <div>
                <h1>Restaurant Menus</h1>

                <div>
                    {/* <Search placeholder="Search for a menu ..." /> */}
                    <TextField
                        label="Search Food"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                        style={{ marginBottom: "20px" }}
                    />
                </div>
                <div className={style.gridContainer}>
                    {restaurants.map((restaurant) => (
                        <div className={style.restaurantContainer} key={restaurant._id}>
                            <h2 className={style.nameBanner}>{restaurant.name}</h2>
                            <div className={style.cardContainer}>
                                {menuItems.filter(menuItem => menuItem.restaurant === restaurant._id).map((menuItem) => {
                                    // const imageUrl = menuItem.img ? `http://localhost:3007/uploads/${menuItem.img}` : '/pizzas.png';
                                    const imageUrl = '/pizzas.png';
                                    console.log(`Image URL for ${menuItem.name}:`, imageUrl); // Add this line
                                    return (
                                        <div className={style.card} key={menuItem._id}>
                                            <img
                                                src={imageUrl}
                                                alt={menuItem.name}
                                                className={style.image}
                                            />
                                            {/* <p>{menuItem.img}</p> */}
                                            <div className={style.content}>
                                                <h2>{menuItem.name}</h2>
                                                <p>{menuItem.description}</p>
                                                <p className={style.price}>${menuItem.price}</p>
                                                <AddCartBtn menuItem={menuItem} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UsersFoodPage;
//export default withPermission(UsersFoodPage, (['VIEW_RESTAURANTS']));
