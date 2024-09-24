import Link from 'next/link';
import styles from '../styles/NavBar.module.css'; // Import the CSS module
import Image from 'next/image';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
        <Image src="/img/logo.png" alt="" width="100" height="90" />
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
      <div className={styles.cart}>
        <Link href="/cart" passHref>
          <div className={styles.cartIcon}>
          <Image src="/img/cart.png" alt="" width="30" height="13" />
            <span className={styles.cartCount}>{quantity}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
