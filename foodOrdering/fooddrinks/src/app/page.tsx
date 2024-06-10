import Link from 'next/link';
import styles from '../ui/admindashboard/homedash/Home.module.css';

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${styles.main}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Food Heaven</h1>
        <div className={styles.loginButton}>
          <br /> <br /><br /> <br />
          <Link className={styles.loginLink} href="/login">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
