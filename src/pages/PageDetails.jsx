// PAGE INDIVIDUAL MOVIE DETAILS

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appTitle, movieDetails, apiReadToken } from '../globals/globalVariables';

import CastCard from '../components/CastCard'
import MovieCardDetails from '../components/MovieCardDetails';
import FavsButton from '../components/FavsButton';
import { useSelector, useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../favs/favSlice';

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
    const [ratingData, setRatingData] = useState([]);

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

        const fetchRatingData = async () => {
            const response = await fetch(
                `${movieDetails}${movieId}/release_dates`, 
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer ' + apiReadToken
                    }
                }
            );
            let data = await response.json();
            setRatingData(data);
        }
    
        if (movieId) {
            fetchMovieData();
            fetchCastData();
            fetchTrailerData();
            fetchRecommendationsData();
            fetchRatingData();
        }
    }, [movieId]);

    return (
        <main>
            {movieData && castData && trailerData && recommendationsData && (
                <>
                    {/* Overview */}
                    <div className='backdrop-container'>
                        <img className="backdrop" src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}  alt="" />
                        <a className='explore-content' href="#overview">Explore<br/>v</a>
                    </div>
                    <div id="overview">
                        <div className='movie-detail-heading'>
                            <h1>{movieData.title}</h1>
                                <FavsButton           
                                    movieObj={movieData}
                                    isFav={isFav}
                                    handleFavClick={handleFavClick}
                                />
                        </div>
                        <p>{movieData.release_date}</p>
                        <p>{movieData.genres && 
                            movieData.genres.map((genre) => genre.name).join(', ')}
                        </p>
                        <div className='rating-container'>
                            <p>{ratingData.results && ratingData.results.find(({iso_3166_1}) => iso_3166_1  == "CA") && ratingData.results.find(({iso_3166_1}) => iso_3166_1  == "CA").release_dates &&
                                ratingData.results.find(({iso_3166_1}) => iso_3166_1  == "CA").release_dates[0].certification ||
                                "NR"}</p>
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
                        <iframe src={trailerData.results  && trailerData.results.find(video => video.site=='YouTube') && 
                                    `https://www.youtube.com/embed/${trailerData.results[0].key}`}
                                allowFullScreen>        
                        </iframe>
                    </section>

                    {/* Explore More */}
                    <section>
                        <h2>Explore More</h2>
                        <div id='explore-container'>
                            {recommendationsData.results && 
                            recommendationsData.total_results > 0 &&   
                            recommendationsData.results.map(movie => {return(<MovieCardDetails imgPath={movie.poster_path} title={movie.title} movieId={movie.id} year={movie.release_date} overview={movie.overview}/>)})}
                        </div>
                    </section>
                </>
            )} n
        </main>
    );
    
}

export default PageDetails;