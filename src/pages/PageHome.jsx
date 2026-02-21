// Page Home

import { useEffect, useState } from 'react';
import { appTitle , nowPlaying, topRated, upcoming, popular, apiReadToken, genres} from '../globals/globalVariables';
import MovieCard from '../components/MovieCard';
import MovieSlider from '../components/MovieSlider';
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

	useEffect(() => {
        document.title = `${appTitle} - Home`;
    }, []);
	
	return (
		<main>
		
			{movies.length > 0 && <MovieSlider movies={movies} />}
	


			<section>
				<div className='search-filter-bar'>
					{/* filter btns */}
					<div className="movie-filters">
						<button onClick={() => setFilter(nowPlaying)}>Now Playing</button>
						<button onClick={() => setFilter(topRated)}>Top Rated</button>
						<button onClick={() => setFilter(upcoming)}>Upcoming</button>
						<button onClick={() => setFilter(popular)}>Popular</button>
					</div>
					<input className="search-bar"type="search" name="searchbar" id="searchbar" placeholder='search' />
				</div>

				{/* cards */}
				<div className="movieCards">
					{movies && movies.map(movie =>{return(
							<MovieCard key={filter + movie.id} movieObj={movie} movieId={movie.id} genresList={genresList}/>
						
						);
					})}
  
				</div>
				

			</section>
        </main>
	);

}

export default PageHome;