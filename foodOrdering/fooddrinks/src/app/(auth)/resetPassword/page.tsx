import React from 'react';
import styles from '@/ui/auth/forgot/ForgotPassword.module.css';

const ResetPassword = () => {
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.header}>Reset Password</h2>
                <form>
                    <label className={styles.label} htmlFor="email">Email:</label>
                    <input type="email" id="email" className={styles.input} required />
                    <button type="submit" className={styles.button}>Verify Email</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
