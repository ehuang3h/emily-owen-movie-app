// Page Favs

import { useEffect } from 'react';
import { appTitle } from '../globals/globalVariables';

function PageFavs() {

    useEffect(() => {
        document.title = `${appTitle} - Favourites`;
    }, []);

    return (
        <main>
            <section>
                <h1>Favourites</h1>

                <div className='search-filter-bar'>
                                  
                                    <div className="movie-filters">
                                        <button onClick={() => setFilter(nowPlaying)}>Date Added</button>
                                        <button onClick={() => setFilter(topRated)}>Release Date</button>
                                        <button onClick={() => setFilter(upcoming)}>Alphabetical</button>
                            
                                    </div>
                                    <input className="search-bar"type="search" name="searchbar" id="searchbar" placeholder='search' />
                                </div>
                
            </section>
        </main>
    );
    
}

export default PageFavs;
