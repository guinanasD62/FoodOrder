"use client";

//with error handler in every field

import RestoNavbar from '@/ui/restaurant/RestoNavBar/RestoNavBar';
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styles from '@/ui/restaurant/pages/add/AddResto.module.css';

const AddRestaurant = () => {
    //State Management for Form Data:
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    //Error Handling State:  to track errors for each field.
    const [errors, setErrors] = useState<Record<string, string>>({});

    const token = useSelector((state: RootState) => state.session.token);

    //Input Change Handler: The handleInputChange function updates both the form data and the errors state. If an input field is empty, an error message is set for that field.
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors(prev => ({ ...prev, [name]: value ? '' : `Please fill the ${name} field.` }));
    };

    //Form Submission Handler:   function validates the form data before submission. It checks if any field is empty and sets error messages accordingly. If no errors are found, the data is submitted.
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        Object.keys(formData).forEach(key => {
            if (!formData[key as keyof typeof formData]) {
                newErrors[key] = `Please fill the ${key} field.`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (!userId) {
            setError("User ID is not set");
            return;
        }

        const restaurantData = {
            ...formData,
            phone: Number(formData.phone),
            owner: userId,
            createdAt: new Date().toISOString(),
        };

        try {
            await axios.post("http://localhost:3007/addrestaurant", restaurantData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Restaurant added successfully");
            router.push("/restaurant");
        } catch (err) {
            console.error("Failed to add restaurant", err);
            setError("Failed to add restaurant");
        }
    };

    return (
        <>
            <RestoNavbar setUserId={setUserId} />
            <div className={styles.container}>
                <h1>Add new Restaurant</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}

                        />
                        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}

                        />
                        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}

                        />
                        {errors.address && <div style={{ color: 'red' }}>{errors.address}</div>}
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}

                        />
                        {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
                    </div>
                    <button type="submit" className={styles.addButton}>Add Restaurant</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </>
    );
};

export default AddRestaurant;
