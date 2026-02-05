// Page Home

import { useEffect, useState } from 'react';
import { appTitle , nowPlaying, topRated, upcoming, popular, apiReadToken} from '../globals/globalVariables';
import MovieCard from '../components/MovieCard';

function PageHome(){


	const [movies, setMovies] = useState([]);
	const [filter, setFilter] = useState(nowPlaying);

	 useEffect(() => {
        const fetchNowPlayingMovies = async () => {
            
            const response = await fetch(filter, {
          
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer '
					+apiReadToken
				}
            });
            let data = await response.json();
			
			setMovies(data.results);
            
        }
        fetchNowPlayingMovies();
    }, [filter]);

	

	return (
		<main>
            <section>
               {/* carousel */}
                
            </section>

			<section>
				<input type="search" name="searchbar" id="searchbar" placeholder='search' />
				{/* filter btns */}
				<div className="filters">
					<button onClick={() => setFilter(nowPlaying)}>Now Playing</button>
					<button onClick={() => setFilter(topRated)}>Top Rated</button>
					<button onClick={() => setFilter(upcoming)}>Upcoming</button>
					<button onClick={() => setFilter(popular)}>Popular</button>
				</div>

				{/* cards */}
				<div className="movieCards">
					{movies && movies.map(movie =>{return(
					
							<MovieCard imgPath={movie.poster_path} title={movie.title} movieId={movie.id}/>
						);
					})}
                        
                    
					

					
				</div>
				

			</section>
        </main>
	);

}

export default PageHome;