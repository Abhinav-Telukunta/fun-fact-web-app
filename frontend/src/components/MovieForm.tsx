import { useState } from 'react';
import { movieApi } from '../api';
import axios from 'axios';

export default function MovieForm({ onSaved }: { onSaved: () => void }) {
  const [movie, setMovie] = useState('');
  const onSubmit = async () => {
    try{
      await axios.post(movieApi,{favoriteMovie: movie});
      onSaved();
    }
    catch(err){
      console.error('post movie failed: ', err);
    }
  };

  return (
    <div>
      <input value={movie} placeholder={"Input favorite movie.."} onChange={e => setMovie(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}