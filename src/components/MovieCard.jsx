import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function MovieCard({title, releaseDate, rating, imgPath, movieId}){
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
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
                <Link 
                    to={`/details/${movieId}`}
                    className='movie-link'
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        color: 'white',
                        textDecoration: 'none',
                        padding: '10px 20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: '5px'
                    }}
                >
                    View Details
                </Link>
            )}
            <h2>{title}</h2>
        </div>
    );
}

export default MovieCard;