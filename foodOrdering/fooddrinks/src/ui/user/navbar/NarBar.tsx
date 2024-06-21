"use client"

import styles from "@/ui/user/navbar/NavBar.module.css";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { selectCartCount } from "@/redux/slice/cartReducer";
// import LogoutButton from "../../../ui/customer/btn/logoutBtn"; // Ensure the correct path
// import { useAuth } from "../../../auth/auth-context"; // Ensure the correct path
import { useRouter } from 'next/navigation';

import Search from "@/ui/forAll/Search/Search";
type MenuItem = {
    title: string;
    path: string;
};

type MenuCategory = {
    title: string;
    list: MenuItem[];
};

// const menuItems: MenuCategory[] = [
//     {
//         title: "Pages",
//         list: [
//             {
//                 title: "Dashboard",
//                 path: "/customer",
//             },
//             {
//                 title: "Products",
//                 path: "/customer/products",
//             },
//             {
//                 title: "Cart",
//                 path: "/customer/cart",
//             },
//             {
//                 title: "Logout",
//                 path: "/customer/products",
//             },
//         ],
//     },
// ];

const Navbar: React.FC = () => {
    // const cartCount = useSelector((state: RootState) => selectCartCount(state));
    // const { isAuthenticated } = useAuth();
    const router = useRouter();

    const handleCartClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // if (!isAuthenticated) {
        e.preventDefault();
        router.push('/login');
        // }
    };


    return (
        <div className={styles.container}>
            <nav className={styles.containerNav}>
                <div className={styles.userTitle}><Link href="/dashboard">Fooder</Link></div>


                <div>
                    <Search placeholder="Search for a menu ..." />
                </div>
                <ul className={styles.list}>
                    {/* <li><Link href="/customer/products" className={styles.containerCustomer}>Products</Link></li> */}
                    <li>
                        <Link href="/user/cart" className={styles.containerCustomer} onClick={handleCartClick}>
                            Cart
                            {/* View Cart {cartCount > 0 && `(${cartCount})`} */}
                            <IconButton color="inherit">
                                <ShoppingCartIcon />
                            </IconButton>
                        </Link>
                    </li>
                    <li><Link href="/login" className={styles.containerCustomer}>Login</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;