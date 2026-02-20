// Page Favs

import { useEffect, useState } from 'react';
import { appTitle } from '../globals/globalVariables';
import MovieCard from '../components/MovieCard';
import FavsButton from '../components/FavsButton';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFav } from '../favs/favSlice';
function PageFavs() {

    useEffect(() => {
        document.title = `${appTitle} - Favourites`;
    }, []);

    // const [favs,setFavs] = useState(false);
    const favs = useSelector((state) => state.favs.items);
    const [sortBy, setSortBy] = useState('dateAdded');
    const sortedFavs = [...favs].sort((a, b) => {
        if (sortBy === 'alpha') {
            return a.title.localeCompare(b.title);
        }
        if (sortBy === 'dateAdded') {
            return b.dateAdded - a.dateAdded; // oldest first
        }
        if (sortBy === 'releaseDate') { //most recent year
            let yearA = a.release_date.split('-');
            let yearB = b.release_date.split('-');
            return yearB[0] - yearA[0]; 
        }
    });

    const dispatch = useDispatch();

    function handleFavClick(addToFav, obj) {
        if (addToFav === false) {
            dispatch(deleteFav(obj));
        }
    }

    return (
        <main>
            <section>
                <h1>Favourites</h1>

                <div className='search-filter-bar'>
                                  
                    <div className="movie-filters">
                        <button onClick={() => setSortBy('dateAdded')}>Date Added</button>
                        <button onClick={() => setSortBy('releaseDate')}>Release Date</button>
                        <button onClick={() => setSortBy('alpha')}>Alphabetical</button>
            
                    </div>
                    <input className="search-bar"type="search" name="searchbar" id="searchbar" placeholder='search' />
                </div>
    

                {favs.length < 1 ? <p>Your favourites list is currently empty. Add favourite movies by clicking the <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5d8bec"><path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Zm60-91 220-93 220 93v-574H260v574Zm0-574h440-440Z"/></svg> on movie cards.</p> : 
                    <div className="favs-area">
                        {sortedFavs.map((movie, i) => {
                            return( <div className='favs-card'>
                            <MovieCard key={i} 
                                movieObj={movie}
                                isFav={true} movieId={movie.id} 
                            /> 
                                            
                            <div className='favs-icon'>
                                <FavsButton
                                    movieObj={movie}
                                    isFav={true}
                                    handleFavClick={handleFavClick}
                                />
                            </div>
                           </div>
                           )
                                           
                                           
                        })}
				    </div>}
                
            </section>
        </main>
    );
    
}

export default PageFavs;
