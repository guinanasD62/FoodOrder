"use client";

import React from 'react';
import styles from '../LogoutBtn/LogoutBtn.module.css';
import { useAuth } from '@/auth/auth-context';

const LogoutButton: React.FC = () => {
    const auth = useAuth();

    const handleLogout = () => {
        auth.logout();
    };

    return (
        <button onClick={handleLogout} className={styles.button}>
            Logout</button>
    );
};

export default LogoutButton;
