import Link from 'next/link';
import React from 'react';
import styles from '@/ui/admindashboard/navbarAdmin/NavBarAdmin.module.css';
import LogoutButton from '@/ui/forAll/LogoutBtn/LogoutBtn';

const NavbarAdmin = () => {
    return (
        <header className={styles.appBar}>
            <nav className={styles.containerNav}>
                <div className={styles.leftSection}>
                    <span className={styles.adminTitle}>Fooder Admin</span>
                </div>
                <div className={styles.rightSection}>
                    <ul className={styles.list}>
                        <li>
                            <Link className={styles.containerCustomer} href="/admin"> Owners </Link>
                        </li>
                        <li>
                            <Link className={styles.containerCustomer} href="/admin/regUsers"> Users </Link>
                        </li>
                        <li>
                            <Link className={styles.containerCustomer} href="/admin/menus"> Menus </Link>
                        </li>
                        <li>
                            <LogoutButton />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default NavbarAdmin;
