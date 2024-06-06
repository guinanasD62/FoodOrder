"use client"

import React, { useState } from 'react';
import axios from 'axios';

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
        <div className="forgot-password-form">
            <h2>Forgot Password</h2>
            {!emailVerified ? (
                <form onSubmit={handleEmailSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Verify Email</button>
                </form>
            ) : (
                <form onSubmit={handlePasswordSubmit}>
                    <div>
                        <label htmlFor="new-password">New Password:</label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPasswordForm;
