import Link from 'next/link';
import styles from '../styles/NavBar.module.css'; // Import the CSS module
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.transparent}`}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/img/logo.png" alt="Logo" width="100" height="90" />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <div className={styles.authButtons}>
        <Link href="/login" passHref>
          <button className={styles.loginButton}>Sign In</button>
        </Link>
        <Link href="/registration" passHref>
          <button className={styles.registerButton}>Sign Up</button>
        </Link>
      </div>
      <div className={styles.cart}>
        <Link href="/cart" passHref>
          <div className={styles.cartIcon}>
            <Image src="/img/cart.png" alt="Cart" width="20" height="23" />
            <span className={styles.cartCount}>{quantity}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
