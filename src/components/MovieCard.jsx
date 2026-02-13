import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function MovieCard({title, year, rating, imgPath, movieId, genres, genresList,overview}){
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    function truncateToWordLength(str, numWords, ending = '...') {
        const words = str.trim().split(/\s+/);

            if (words.length <= numWords) {
                return str;
            }
        const truncatedWords = words.slice(0, numWords);
        return truncatedWords.join(' ') + ending;
    }

    const dateArray = year.split('-');
    const getGenreNames = () => {
        if (!genres || !genresList || genresList.length === 0) return '';
        
        return genres
            .map(id => {
                const genre = genresList.find(g => g.id === id);
                return genre ? genre.name : '';
            })
            .filter(name => name !== '') 
            .join(' | '); // Join with line
    };
    

    return (
        <div className='movieCard' onClick={handleClick}>
            <img 
                src={`https://image.tmdb.org/t/p/w500${imgPath}`} 
                alt={title}
                style={{
                    opacity: isClicked ? 0.3 : 1,
                    transition: 'opacity 0.3s ease'
                }}
            />
            {isClicked && (
                <div className='card-popup'>
                    <p>{truncateToWordLength(overview,8)}</p>
                    <Link 
                        to={`/details/${movieId}`}
                        className='movie-link'
            
                    >
                        Read More
                    </Link>
                </div>
            )}
            <p>{dateArray[0]}</p>
            <Link to={`/details/${movieId}`}style={{
                        color:'white',
                        textDecoration: 'none'
                    }}>
            <h2>{title}</h2>
            </Link>
            <p className="genres">{getGenreNames()}</p>
        </div>
    );
}

export default MovieCard;