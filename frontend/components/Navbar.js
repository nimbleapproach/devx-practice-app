import { useContext } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import UserContext from '../context/UserContext';

const Navbar = () => {
    const { token } = useContext(UserContext);
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about-us">About Us</Link>
                </li>
                {token && (
                  <>
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/add-transaction">Add Transaction</Link>
                    </li>
                    <li>
                        <Link href="/logout">Logout</Link>
                    </li>
                  </>
                )}
                {!token && (
                  <>
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                    <li>
                        <Link href="/signup">Sign Up</Link>
                    </li>
                  </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;