import { useEffect, useState } from 'react';
import LoginButton from './components/LoginButton';
import MovieForm from './components/MovieForm';
import { authUrl, logoutUrl, funfactApi } from './api';
import './App.css';


interface User {
  name: string;
  email: string;
  image?: string;
  favoriteMovie?: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [fact, setFact] = useState<string>('');

  // Bootstrap session
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await fetch(authUrl, { credentials: 'include' });
        if (res.status === 401) {
          setUser(null);
          return;
        }
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error('Auth bootstrap failed:', err);
        setUser(null);
      }
    };
    bootstrap();
  }, []);

  // Fetch a fun fact whenever we have a favoriteMovie
  useEffect(() => {
    if (user?.favoriteMovie!=null) {
      fetch(funfactApi, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setFact(data.fact))
        .catch(err => console.error('Funfact fetch error:', err));
    }
  }, [user]);

  if (user === null) return <LoginButton />;

  return (
    <div className='content'>
      <div className="header">
        <button onClick={() => (window.location.href = logoutUrl)}>
          Logout
        </button>
      </div>
       <h1>Welcome, {user.name}</h1>
        <p>Email: {user.email}</p>
        {user.image && <img src={user.image} alt="Profile" width={80} />}
        {user.favoriteMovie ? (
          <>
            <h2>Your favorite movie: {user.favoriteMovie}</h2>
            <p>Fun Fact: {fact}</p>
          </>
        ) : (
          <MovieForm onSaved={() => window.location.reload()} />
        )}
    </div>
  );
}