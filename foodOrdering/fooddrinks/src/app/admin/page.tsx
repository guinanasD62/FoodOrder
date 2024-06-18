"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '@/ui/admindashboard/admin/Admin.module.css';
import Link from 'next/link';
import { useAuth } from '@/auth/auth-context'; // Ensure the correct path
// import PrivateRoute from '@/auth/private-route';

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    img?: string;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const auth = useAuth(); // Use the useAuth hook

    useEffect(() => {
        if (!auth.isAuthenticated) {
            router.push('/login'); // Redirect to login if not authenticated
        }
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3007/getusers');
                setUsers(response.data.data);
            } catch (error: any) {
                setError(error.response?.data?.message || 'Error fetching users');
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3007/deleteuser/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUpdate = (id: string) => {
        router.push(`/admin/${id}`);
    };

    const renderTable = (role: string) => (
        <>
            {/* <PrivateRoute> */}
            <div>
                <h2 className={styles.header}>{role.charAt(0).toUpperCase() + role.slice(1)}s</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Mobile Phone</th>
                            <th className={styles.th}>Address</th>
                            <th className={styles.th}>Role</th>
                            <th className={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter(user => user.role === role).map(user => (
                            <tr key={user._id}>
                                <td className={styles.td}>{user.name}</td>
                                <td className={styles.td}>{user.email}</td>
                                <td className={styles.td}>{user.phone}</td>
                                <td className={styles.td}>{user.address}</td>
                                <td className={styles.td}>{user.role}</td>
                                <td className={styles.td}>
                                    <button onClick={() => handleUpdate(user._id)} className={styles.button}>Edit</button>
                                    <button onClick={() => handleDelete(user._id)} className={styles.button}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            {/* </PrivateRoute> */}
        </>
    );

    return (
        <div className={styles.container}>

            {error && <p className={styles.error}>{error}</p>}
            <h1 className={styles.header}>Welcome </h1>
            {renderTable('adminAdmin')}
            <br /> <br /> <br />
            {renderTable('admin')}
            <br /> <br /> <br />
            {/* {renderTable('restaurant')} */}
            {/* {renderTable('user')} */}

            <div className={styles.tableContainer}>
                <Link href="/admin/addUser">
                    <button className={styles.button}>Add New</button>

                </Link>
            </div>
        </div >
    );
};

export default UsersPage;
