// Page Home

import { useEffect, useState } from 'react';
import { appTitle , nowPlaying, topRated, upcoming, popular, apiReadToken, genres} from '../globals/globalVariables';
import MovieCard from '../components/MovieCard';

function PageHome(){


	const [movies, setMovies] = useState([]);
	const [filter, setFilter] = useState(nowPlaying);
	const [genresList, setGenresList] = useState([]);

	 useEffect(() => {
        const fetchMovies = async () => {
            
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
        fetchMovies();
    }, [filter]);

	useEffect(() => {
        const fetchGenres = async () => {
            
            const response = await fetch(genres, {
          
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer '
					+apiReadToken
				}
            });
            let genreData = await response.json();
			setGenresList(genreData.genres);
			
            
        }
        fetchGenres();
    }, []);

	

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
							<MovieCard imgPath={movie.poster_path} title={movie.title} movieId={movie.id} genres={movie.genre_ids} genresList={genresList}/>

						);
					})}
                        
                    
					

					
				</div>
				

			</section>
        </main>
	);

}

export default PageHome;