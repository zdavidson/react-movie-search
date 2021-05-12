import React, {useState} from 'react';
import MovieCard from './MovieCard.js';

export default function SearchMovies() {

    //states- input query, movies
    const [query, setQuery] = useState('');

    // create a state for movies, and update the state
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=4d66334f82eff6f1c6a7797aeb80d23c&query=${query}&language=en-US&page=1&include_adult=false`;
    
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label htmlFor="query" className="label">Movie Name</label>
                <input className="input" type="text" name="query" placeholder="ie. Godzilla"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                ></input>
                <button className="button" type="submit">Search</button>
            </form>

            <div className="card-list">
                {/* filter for movies with posters, then display those with posters [note key prop for unique IDs]*/}
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie}  key={movie.id}/>
                ))}
            </div>
        </>
    )   
}