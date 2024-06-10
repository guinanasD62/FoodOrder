"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './LoginForm.module.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3007/login', {
                email,
                password,
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Store token in local storage
                router.push('/admindashboard/admin'); // Redirect to dashboard or another page
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                <br /> <br />
                {/* <Link href="/forgotPassword">Forgot Password?</Link>
                <br />
                <Link href="/resetPassword">Reset Password</Link> */}
                <br />
                <Link href="/register">Register</Link>
            </form>
        </div>
    );
};

export default LoginForm;
