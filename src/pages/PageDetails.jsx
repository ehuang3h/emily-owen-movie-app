// Page Details

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appTitle, movieDetails, apiReadToken } from '../globals/globalVariables';
import FavsButton from '../components/FavsButton';
import { useSelector, useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../favs/favSlice';

function PageDetails() {

    useEffect(() => {
        document.title = `${appTitle} - details`;
    }, []);

    const { movieId } = useParams();
    const [movieData, setMovieData] = useState([]);

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
                        <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt="" />
                        <p>{movieData.overview}</p>
                        <FavsButton
                            movieObj={movieData}
                            isFav={isFav}
                            handleFavClick={handleFavClick}
                        />
                    </div>
                )}
            </section>
        </main>
    );

}

export default PageDetails;