"use client"

import React, { useEffect, useState } from 'react';
import styles from '@/ui/restaurant/dynamicResto/DynamicResto.module.css';

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    restaurant: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

const MenuItemList: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const restaurantId = '66666dc79831d485de206b55'; // Replace with dynamic value if needed

    const mockData: MenuItem[] = [
        {
            _id: '66666e2e9831d485de206b59',
            name: 'Hawaiian Cheezy Pizza',
            description: 'A delicious Hawaiian Cheezy Pizza with fresh ingredients.',
            price: 29.99,
            quantity: 57,
            restaurant: '66666dc79831d485de206b55',
            category: 'fast food',
            createdAt: '2024-06-10T03:08:30.592Z',
            updatedAt: '2024-06-10T03:08:30.592Z',
        },
        {
            _id: '66666eb19831d485de206b5d',
            name: 'Ham Cheeze Pizza',
            description: 'A delicious Ham Cheeze Pizza with fresh ingredients.',
            price: 19.99,
            quantity: 51,
            restaurant: '66666dc79831d485de206b55',
            category: 'fast food',
            createdAt: '2024-06-10T03:10:41.912Z',
            updatedAt: '2024-06-10T03:10:41.912Z',
        },
        {
            _id: '66666ee29831d485de206b61',
            name: 'Pepperoni Pizza',
            description: 'A delicious Pepperoni Pizza with fresh ingredients.',
            price: 24.99,
            quantity: 41,
            restaurant: '66666dc79831d485de206b55',
            category: 'fast food',
            createdAt: '2024-06-10T03:11:30.949Z',
            updatedAt: '2024-06-10T03:11:30.949Z',
        },
    ];

    useEffect(() => {
        // Simulate data fetching
        const fetchMenuItems = () => {
            const filteredItems = mockData.filter((item) => item.restaurant === restaurantId);
            setMenuItems(filteredItems);
        };

        fetchMenuItems();
    }, [restaurantId]);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Menu Items</h1>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Description</th>
                            <th className={styles.th}>Price</th>
                            <th className={styles.th}>Quantity</th>
                            <th className={styles.th}>Created At</th>
                            <th className={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map((item) => (
                            <tr key={item._id}>
                                <td className={styles.td}>{item.name}</td>
                                <td className={styles.td}>{item.description}</td>
                                <td className={styles.td}>{item.price}</td>
                                <td className={styles.td}>{item.quantity}</td>
                                <td className={styles.td}>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td className={styles.td}>
                                    <button className={styles.update}>Update</button>
                                    <button className={styles.button}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenuItemList;
