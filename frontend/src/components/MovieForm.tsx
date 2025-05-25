import { useState } from 'react';
import { movieApi } from '../api';

export default function MovieForm({ onSaved }: { onSaved: () => void }) {
  const [movie, setMovie] = useState('');
  const onSubmit = async () => {
    await fetch(movieApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ favoriteMovie: movie }),
    });
    onSaved();
  };

  return (
    <div>
      <input value={movie} placeholder={"Input favorite movie.."} onChange={e => setMovie(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}