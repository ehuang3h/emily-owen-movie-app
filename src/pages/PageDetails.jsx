// PAGE INDIVIDUAL MOVIE DETAILS

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appTitle, movieDetails, apiReadToken } from '../globals/globalVariables';
import FavsButton from '../components/FavsButton';
import { useSelector, useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../favs/favSlice';

import CastCard from '../components/CastCard'

function PageDetails() {

    useEffect(() => {
        document.title = `${appTitle} - details`;
    }, []);

    const { movieId } = useParams();
    const [movieData, setMovieData] = useState([]);
    const [castData, setCastData] = useState([]);
    const [trailerData, setTrailerData] = useState([]);

    const favs = useSelector((state) => state.favs.items);
    const dispatch = useDispatch();

    const isFav = favs.some(fav => fav.id === movieData.id);

    function handleFavClick(addToFav, obj) {
        if (addToFav === true) {
            dispatch(addFav(obj));
        } else {
            dispatch(deleteFav(obj));
        }
    }

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

        const fetchCastData = async () => {
            const response = await fetch(
                `${movieDetails}${movieId}/credits`, 
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer ' + apiReadToken
                    }
                }
            );
            let data = await response.json();
            setCastData(data);
        }

        const fetchTrailerData = async () => {
            const response = await fetch(
                `${movieDetails}${movieId}/videos`, 
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer ' + apiReadToken
                    }
                }
            );
            let data = await response.json();
            setTrailerData(data);
        }
        
        if (movieId) {
            fetchMovieData();
            fetchCastData();
            fetchTrailerData();
        }
    }, [movieId]);

    return (
        <main>
            {movieData && castData && trailerData && (
                <>
                    {/* Overview */}
                    <div className='backdrop-container'>
                        <img className="backdrop" src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}  alt="" />
                    </div>
                    <div id="overview">
                        <h1>{movieData.title}</h1>
                        <p>{movieData.release_date}</p>
                        <p>{movieData.genres && 
                            movieData.genres.map((genre) => genre.name).join(', ')}
                        </p>
                        <div id='rating-container'>
                            <p>{Math.trunc(movieData.vote_average * 10)}%</p>
                        </div>
                        <p>{movieData.overview}</p>
                        <FavsButton           
                            movieObj={movieData}
                            isFav={isFav}
                            handleFavClick={handleFavClick}
                        />
                    </div>
                
                    {/* Cast */}
                    <section>
                        <h2>Cast</h2>
                        <div className='cast-layout'>
                            {castData.cast && 
                             castData.cast.map((cast) => {return(
                                <CastCard name={cast.name} imgPath={cast.profile_path}/>
                            );})}
                        </div>
                    </section>

                    {/* Trailer */}
                    <section className='trailer-container'>
                        <h2>Trailer</h2>
                        <iframe src={trailerData.results  && trailerData.results[0].site=='YouTube' && 
                                    `https://www.youtube.com/embed/${trailerData.results[0].key}`}
                                allowFullScreen>        
                        </iframe>
                    </section>

                    {/* Explore More */}
                    <section>
                        <h2>Explore More</h2>
                    </section>
                </>
            )}
        </main>
    );

}

export default PageDetails;