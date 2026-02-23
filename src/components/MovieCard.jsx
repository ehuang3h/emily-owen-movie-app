import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function MovieCard({movieObj, movieId, genresList}){
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    //shorten movie content string
    function truncateToWordLength(str, numWords, ending = '...') {
        const words = str.trim().split(/\s+/);

            if (words.length <= numWords) {
                return str;
            }
        const truncatedWords = words.slice(0, numWords);
        return truncatedWords.join(' ') + ending;
    }
    //convert rating to percent
    const percentRating = Math.trunc(movieObj.vote_average*10);

    //get year of movie 
    const dateArray = movieObj.release_date.split('-');

    //format genres
    const getGenreNames = () => {
        if (!movieObj.genre_ids || !genresList || genresList.length === 0) return '';
        
        return movieObj.genre_ids
            .map(id => {
                const genre = genresList.find(g => g.id === id);
                return genre ? genre.name : '';
            })
            .filter(name => name !== '') 
            .join(' | '); // Join with line
    };
    

    return (
        <div className='movieCard' 
        onClick={handleClick}
        onMouseEnter={() => setIsClicked(true)}
        onMouseLeave={() => setIsClicked(false)}
        
        >
            <img 
                src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`} 
                alt={movieObj.title}
                style={{
                    opacity: isClicked ? 0.2 : 1,
                    transition: 'opacity 0.3s ease'
                }}
            />
            {isClicked && (
                <div className='card-popup'>
                    <div className='rating-circle'>
                        <p className='rating'>{percentRating}%</p>
                    </div>
                    <p className='excerpt'>{truncateToWordLength(movieObj.overview,8)}</p>
                    <Link 
                        to={`/details/${movieId}`}
                        className='movie-link'
                    >
                     Read More
                    </Link>
                    
                </div>
            )}
            <p className='card-year'>{dateArray[0]}</p>
            <Link to={`/details/${movieId}`}style={{
                        color:'white',
                        textDecoration: 'none'
                    }}>
            <p className='card-film-title'>{movieObj.title}</p>
            </Link>
            <p className="genres">{getGenreNames()}</p>
        </div>
    );
}

export default MovieCard;