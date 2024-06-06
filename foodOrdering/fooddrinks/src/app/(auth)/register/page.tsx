"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '@/ui/auth/register/Register.module.css';

interface User {
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    img?: string;
    role: string;
}

const Register: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        role: 'user',
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3007/adduser', formData);
            if (response.data.data) {
                router.push('/login'); // Redirect to login page
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Register</h1>
                {error && <p className={styles.error}>{error}</p>}
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <label htmlFor="phone" className={styles.label}>Phone Number</label>
                <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <label htmlFor="address" className={styles.label}>Address</label>
                <input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={styles.form}
                />
                <button type="submit" className={styles.form}>Register</button>
            </form>
        </div>
    );
};

export default Register;
