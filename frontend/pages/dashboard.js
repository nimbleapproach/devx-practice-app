import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import UserContext from '../context/UserContext';
import { getTransactionsByUser, getUserByUsername } from '../services/api_client';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
    const router = useRouter();
    const { token, username } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const isLoggedIn = token != null;
        if (!isLoggedIn) {
            router.push('/login');
        } else {
            fetchUserData();
        }
    }, [token]);

    const fetchUserData = async () => {
        try {
            const user = await getUserByUsername(username, token);
            setUserId(user.id);
            const transactions = await getTransactionsByUser(user.id, token);
            setTransactions(transactions);
        } catch (error) {
            console.error('Failed to fetch user data', error);
        }
    };

    return (
        <>
            <h1>User Dashboard</h1>
            <p>Welcome to your dashboard! Here you can view your information and manage your transactions.</p>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Dashboard;