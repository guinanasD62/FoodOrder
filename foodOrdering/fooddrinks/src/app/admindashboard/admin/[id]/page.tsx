"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (user) {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        try {
            const response = await axios.put(`http://localhost:3007/updateuser/${user._id}`, user);
            setUser(response.data.data);
            router.push('/admindashboard/admin');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Error updating user');
        }
    };

    return (
        <div>
            <h1>Edit User</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user && (
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={user._id} />
                    <label>Name</label>
                    <input name="name" value={user.name} onChange={handleChange} required />
                    <label>Email</label>
                    <input name="email" type="email" value={user.email} onChange={handleChange} required />
                    <label>Phone</label>
                    <input name="phone" value={user.phone} onChange={handleChange} required />
                    <label>Address</label>
                    <input name="address" value={user.address} onChange={handleChange} required />
                    <label>Role</label>
                    <input name="role" value={user.role} onChange={handleChange} required />
                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
}

export default SingleUserPage;
