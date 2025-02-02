import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { createTransaction, getUserByUsername } from '../services/api_client';
import UserContext from '../context/UserContext';
import styles from '../styles/AddTransaction.module.css';

const AddTransaction = () => {
    const { token, username } = useContext(UserContext);
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Handle transaction submission logic here
        const user = await getUserByUsername(username, token);
        try {
          console.log('Submitting transaction:', { user_id: user.id, amount, description });
          await createTransaction({ user_id: user.id, amount, description }, token);
          // Redirect to dashboard or another page after submission
          router.push('/dashboard');
        } catch(err) {
          // Handle error here
          setError('An error occurred. Please try again.');
          console.log(err);
        }
    };

    return (
        <div>
            <h1>Create Transaction</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
};

export default AddTransaction;