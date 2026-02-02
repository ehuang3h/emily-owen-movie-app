// Page Home

import { useEffect, useState } from 'react';
import { appTitle ,  movieDetails} from '../globals/globalVariables';
//api call here to populate fields 

function MovieCard({title, releaseDate, rating, imgPath}){


	return (
		<div className='movieCard'>
								
            {/* <p>{movie.overview}</p> */}
            <img 
                src={`https://image.tmdb.org/t/p/w500${imgPath}`} 
                alt={title} 
            />
            <h2>{title}</h2>
        </div>
	);

}

export default MovieCard;