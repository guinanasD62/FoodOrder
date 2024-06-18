"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/customerSlice/session';
import styles from './LoginForm.module.css';

const
    LoginForm: React.FC = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const router = useRouter();
        const dispatch = useDispatch();

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://localhost:3007/login', {
                    email,
                    password,
                });
                console.log('API response: --->', response.data);
                if (response.data.token && response.data.user) {
                    dispatch(loginSuccess({
                        token: response.data.token,
                        user: {
                            id: response.data.user._id,
                            name: response.data.user.name,
                            email: response.data.user.email,
                            role: response.data.user.role,

                        }
                    }));

                    // Redirect based on role 
                    if (response.data.user.role === 'admin') {
                        router.push('/restaurant');
                    } else if (response.data.user.role === 'user') {
                        router.push('/user');
                    } else if (response.data.user.role === 'adminAdmin') {
                        router.push('/admin');
                    }
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
                    <br />
                    <Link href="/register">Register</Link>
                </form>
            </div>
        );
    };

export default LoginForm;
