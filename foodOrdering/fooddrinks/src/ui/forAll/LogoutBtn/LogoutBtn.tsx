"use client";

import React from 'react';
import { useAuth } from '../../../auth/auth-context';

const LogoutButton: React.FC = () => {
    const auth = useAuth();

    const handleLogout = () => {
        auth.logout();
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
