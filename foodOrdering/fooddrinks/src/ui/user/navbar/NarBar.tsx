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
import { Search } from "@mui/icons-material";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

type MenuItem = {
    title: string;
    path: string;
};

type MenuCategory = {
    title: string;
    list: MenuItem[];
};

const menuItems: MenuCategory[] = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/customer",
            },
            {
                title: "Products",
                path: "/customer/products",
            },
            {
                title: "Cart",
                path: "/customer/cart",
            },
            {
                title: "Logout",
                path: "/customer/products",
            },
        ],
    },
];

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


    /// MUI


    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '50ch',
            },
        },
    }));

    ////
    return (
        <div className={styles.container}>
            <nav className={styles.containerNav}>
                <div className={styles.userTitle}><Link href="/dashboard">Fooder</Link></div>

                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>

                <ul className={styles.list}>
                    {/* <li><Link href="/customer/products" className={styles.containerCustomer}>Products</Link></li> */}
                    <li>
                        <Link href="/customer/cart" className={styles.containerCustomer} onClick={handleCartClick}>
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