"use client";

import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/ui/auth/forgot/ForgotPassword.module.css';

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [emailVerified, setEmailVerified] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3007/verifyEmail', { email });
            if (response.data.verified) {
                setEmailVerified(true);
                setMessage('Email verified. Please enter your new password.');
            } else {
                setMessage('Email not found.');
            }
        } catch (error) {
            setMessage('Error verifying email.');
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3007/resetPassword', { email, newPassword });
            setMessage('Password reset successful.');
        } catch (error) {
            setMessage('Error resetting password.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.header}>Forgot Password</h2>
                {!emailVerified ? (
                    <form onSubmit={handleEmailSubmit}>
                        <div>
                            <label htmlFor="email" className={styles.label}>Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <button type="submit" className={styles.button}>Verify Email</button>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordSubmit}>
                        <div>
                            <label htmlFor="new-password" className={styles.label}>New Password:</label>
                            <input
                                type="password"
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className={styles.label}>Confirm Password:</label>
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <button type="submit" className={styles.button}>Reset Password</button>
                    </form>
                )}
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
