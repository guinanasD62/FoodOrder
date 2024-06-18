"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSession } from '@/redux/customerSlice/session';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './RestoNavBar.module.css';
import LogoutButton from '@/ui/forAll/LogoutBtn/LogoutBtn';

interface RestoNavbarProps {
    setUserId: (userId: string) => void;
}

const
    RestoNavbar: React.FC<RestoNavbarProps> = ({ setUserId }) => {
        const dispatch = useDispatch();
        const router = useRouter();
        const user = useSelector((state: any) => state.session.user);
        const isAuthenticated = useSelector((state: any) => state.session.isAuthenticated);

        useEffect(() => {
            if (user && isAuthenticated) {
                setUserId(user.id);
            }
        }, [user, isAuthenticated, setUserId]);

        return (
            <nav className={styles.navbar}>
                <div className={styles.navbarContainer}>
                    <Link href="/" className={styles.logo}>
                        Admin Restaurant
                    </Link>
                    {isAuthenticated && user ? (
                        <>
                            <div className={styles.userContainer}>
                                Hello, {user.name} (ID: {user.id} (Role: {user.role})
                                <LogoutButton />
                            </div>
                        </>
                    ) : (
                        <Link href="/login" className={styles.loginButton}>
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        );
    };

export default RestoNavbar;
