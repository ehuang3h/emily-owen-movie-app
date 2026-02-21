import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function MovieCardDetails({title, year, rating, imgPath, movieId, overview}){
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

    return (
        <div className='movie-card-details' onClick={handleClick}>
            <img 
                src={`https://image.tmdb.org/t/p/w500${imgPath}`} 
                alt={title}
                style={{
                    opacity: isClicked ? 0.3 : 1,
                    transition: 'opacity 0.3s ease'
                }}
            />
            {isClicked && (
                <div className='card-details-popup'>
                    <p>{truncateToWordLength(overview,8)}</p>
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
            <p>{title}</p>
            </Link>        
        </div>
    );
}

export default MovieCardDetails;