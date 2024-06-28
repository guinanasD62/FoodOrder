"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '@/ui/admindashboard/admin/PerID.module.css';

type Role = 'adminAdmin' | 'admin' | 'user';

const rolePermissions: Record<Role, string[]> = {
    adminAdmin: ['ADD_RESTAURANT', 'VIEW_RESTAURANTS', 'VIEW_RESTAURANT', 'UPDATE_RESTAURANT', 'DELETE_RESTAURANT'],
    admin: ['VIEW_RESTAURANTS', 'VIEW_RESTAURANT', 'UPDATE_RESTAURANT'],
    user: ['VIEW_RESTAURANTS', 'VIEW_RESTAURANT']
};

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: Role;
    permissions: string[];
    img?: string;
}

interface Params {
    id: string;
}

const SingleUserPage = ({ params }: { params: Params }) => {
    const { id } = params;
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        if (!id) return;
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3007/getuser/${id}`);
                setUser(response.data.data);
            } catch (error: any) {
                setError(error.response?.data?.message || 'Error fetching user');
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setUser(prevUser => {
            if (!prevUser) return prevUser;

            let updatedUser = { ...prevUser, [name]: value };

            if (name === 'role') {
                const newRole = value as Role;
                updatedUser = {
                    ...updatedUser,
                    role: newRole,
                    permissions: rolePermissions[newRole]
                };
            }

            return updatedUser;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            const { _id, name, email, phone, address, role, permissions } = user;
            const response = await axios.put(`http://localhost:3007/updateuser/${_id}`, {
                name,
                email,
                phone,
                address,
                role,
                permissions
            });
            setUser(response.data.data);
            router.push('/admin');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Error updating user');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.header}>Edit User</h1>
                {error && <p className={styles.error}>{error}</p>}
                {user && (
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="id" value={user._id} />
                        <label className={styles.label} htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <label className={styles.label} htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <label className={styles.label} htmlFor="address">Address</label>
                        <input
                            id="address"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <label className={styles.label} htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        >
                            <option value="adminAdmin">Admin Admin</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <button type="submit" className={styles.button}>Update</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SingleUserPage;
