import { useState } from 'react';
import { movieApi } from '../api';
import axios from 'axios';

export default function MovieForm({ onSaved, prevMovies }: { onSaved: (response:any) => void , prevMovies: String[]}) {
  const [movie, setMovie] = useState('');
  const onSubmit = async () => {
    try{
      if(movie=='') return;
      prevMovies.push(movie);
      const response = await axios.post(movieApi,{movies: prevMovies});
      onSaved(response.data);
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