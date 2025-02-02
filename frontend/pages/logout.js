import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import UserContext from '../context/UserContext';

const Logout = () => {
    const { logout } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        logout();
        router.push('/');
    }, []);

    return null;
};

export default Logout;