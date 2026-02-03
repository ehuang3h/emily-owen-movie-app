// Page Favs

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appTitle, movieDetails, apiReadToken } from '../globals/globalVariables';

function PageDetails() {

    useEffect(() => {
        document.title = `${appTitle} - details`;
    }, []);

    const { movieId } = useParams();
    
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        const fetchMovieData = async () => {
            const response = await fetch(
                `${movieDetails}${movieId}`, 
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer ' + apiReadToken
                    }
                }
            );
            let data = await response.json();
            setMovieData(data);
        }
        
        if (movieId) {
            fetchMovieData();
        }
    }, [movieId]);

    return (
        <main>
            <section>
                <h2>details.MOV</h2>
                {movieData && (
                    <div>
                        <h3>{movieData.title}</h3>
                        <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}  alt="" />
                        <p>{movieData.overview}</p>
                       
                    </div>
                )}
                
            </section>
        </main>
    );
    
}

export default PageDetails;
