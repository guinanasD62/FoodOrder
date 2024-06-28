"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '@/ui/auth/register/Register.module.css';

type Role = 'adminAdmin' | 'admin' | 'user';

interface User {
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    img?: string;
    role: Role;
    permissions: string[];
}

const Register: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<User>({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        role: 'user', // default role
        permissions: [],
    });
    const [error, setError] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form fields
        const newErrors: Record<string, string> = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key as keyof typeof formData]) {
                newErrors[key] = `Please fill the ${key} field.`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

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
                <div>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                </div>
                <div>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="phone" className={styles.label}>Phone Number</label>
                    <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
                </div>
                <div>
                    <label htmlFor="address" className={styles.label}>Address</label>
                    <input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {errors.address && <div style={{ color: 'red' }}>{errors.address}</div>}
                </div>
                <div>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                </div>
                <button type="submit" className={styles.form}>Register</button>
            </form>
        </div>
    );
};

export default Register;
