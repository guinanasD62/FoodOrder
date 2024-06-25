// AddCartBtn.tsx
"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, MenuItem } from "@/redux/customerSlice/cartReducer";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/auth-context";
import { Button } from "@mui/material";

interface AddCartBtnProps {
    menuItem: MenuItem;
}

const AddCartBtn: React.FC<AddCartBtnProps> = ({ menuItem }) => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false);
        }, 4000);

        return () => clearTimeout(timeout);
    }, [isSuccess]);

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(addToCart(menuItem));
        setIsSuccess(true);
    };

    const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isAuthenticated) {
            e.preventDefault();
            router.push('/login');
        }
    };

    const combinedClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        handleAddToCart(e);
        handleCartClick(e);
    };

    return (
        <Button variant="contained" color="primary" onClick={combinedClickHandler}>
            {isSuccess ? "Added!" : "Add to cart"}
        </Button>
    );
};

export default AddCartBtn;
