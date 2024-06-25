import Link from 'next/link';
import styles from '../ui/admindashboard/homedash/Home.module.css';
import { useState } from 'react';
import { Router } from 'next/router';
import Loading from './loading';
// import NavbarAdmin from '@/ui/admindashboard/navbar/Navbar';


export default function Home() {

  // const [loading, setLoading] = useState(false);
  // Router.events.on("routeChangeStart", (url) => {
  //   console.log("Route is changing..");
  //   setLoading(true)
  // });
  // Router.events.on("routeChangeComplete", (url) => {
  //   console.log("Route is changing is complete..");
  // })

  return (
    // { loading && <Loading />}

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
