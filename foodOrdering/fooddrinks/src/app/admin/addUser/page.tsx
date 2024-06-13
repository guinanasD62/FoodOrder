"use client"

import React, { useState } from 'react'
import axios from 'axios'
import styles from "@/ui/admindashboard/admin/AddUserPage.module.css"
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    role: string;
}

const AddNewUser = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        role: '',
    });
    const [errors, setErrors] = useState<Partial<User>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (value.trim() === '') {
            setErrors(prevErrors => ({ ...prevErrors, [name]: 'Please fill out this field' }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form data
        const newErrors: Partial<User> = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof User]?.trim()) {
                newErrors[key as keyof User] = 'Please fill out this field';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3007/adduser', formData);
            console.log('User added successfully:', response.data);
            router.push(`/admin`);
            // Handle success, e.g., show a success message, redirect, etc.
        } catch (error) {
            console.error('Error adding user:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <div className={styles.container}>
            <h2>Add new user</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}

                <input
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                />
                {errors.address && <span className={styles.error}>{errors.address}</span>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="general">Choose a Category</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                {errors.role && <span className={styles.error}>{errors.role}</span>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddNewUser;
