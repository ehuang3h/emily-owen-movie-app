// PAGE INDIVIDUAL MOVIE DETAILS

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appTitle, movieDetails, apiReadToken } from '../globals/globalVariables';

import CastCard from '../components/CastCard'
import MovieCardDetails from '../components/MovieCardDetails';
import FavsButton from '../components/FavsButton';
import { useSelector, useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../favs/favSlice';

import noBackdrop from '../imgs/no-image-backdrop.png';

function PageDetails() {

    useEffect(() => {
        document.title = `${appTitle} - details`;
    }, []);

    const { movieId } = useParams();
    
    const [movieData, setMovieData] = useState([]);
    const [castData, setCastData] = useState([]);
    const [trailerData, setTrailerData] = useState([]);
    const [recommendationsData, setRecommendationsData] = useState([]);

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

        const fetchRecommendationsData = async () => {
            const response = await fetch(
                `${movieDetails}${movieId}/recommendations`, 
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer ' + apiReadToken
                    }
                }
            );
            let data = await response.json();
            setRecommendationsData(data);
        }
    
        if (movieId) {
            fetchMovieData();
            fetchCastData();
            fetchTrailerData();
            fetchRecommendationsData();
        }
    }, [movieId]);

    return (
        <main>
            {movieData && castData && trailerData && recommendationsData && (
                <>
                    {/* Overview */}
                    <div className='backdrop-container'>
                        <img className="backdrop" src={movieData.backdrop_path
                                                      ? `https://image.tmdb.org/t/p/original${movieData.backdrop_path} `
                                                      : noBackdrop 
                                                      }
                                                      alt={movieData.title}/>
                        <a className='explore-content' href="#overview">Explore Content<br/>v</a>
                    </div>
                    <div id="overview">
                        <div className='title-fav'>
                            <h1>{movieData.title}</h1>
                        </div>
                        <div className='info-rating'>
                            <FavsButton           
                                movieObj={movieData}
                                isFav={isFav}
                                handleFavClick={handleFavClick}
                            />
                            <div id='rating-container'>
                                <p>{Math.trunc(movieData.vote_average * 10)}%</p>
                            </div>
                            <div>
                                <p>{movieData.release_date}</p>
                                <p>{movieData.genres && 
                                    movieData.genres.map((genre) => genre.name).join(', ')}
                                </p>
                            </div>
                        </div>
                        <p>{movieData.overview}</p>
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
                        {trailerData.results?.find(video => video.site=='YouTube' && video.type=='Trailer')
                            ?<iframe src={`https://www.youtube.com/embed/${trailerData.results.find(video => video.site=='YouTube' && video.type=='Trailer').key}`}
                                    allowFullScreen>        
                            </iframe>
                            : <p>No available trailer.</p>}
                    </section>

                    {/* Explore More */}
                    <section>
                        <h2>Explore More</h2>
                        <div id='explore-container'>
                            {recommendationsData.results && 
                            recommendationsData.total_results > 0 &&   
                            recommendationsData.results.map(movie => {return(<MovieCardDetails imgPath={movie.poster_path} title={movie.title} movieId={movie.id} year={movie.release_date} rating={Math.trunc(movie.vote_average)*10} overview={movie.overview}/>)}) || <p>No recommendations available.</p>}
                        </div>
                    </section>
                </>
            )}
        </main>
    );
    
}

export default PageDetails;