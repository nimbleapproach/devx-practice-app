import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { UserProvider } from '../context/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className="container">
          <Navbar />
          <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;