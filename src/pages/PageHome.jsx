// Page Home

import { useEffect, useState } from 'react';
import { appTitle , nowPlaying, topRated, upcoming, popular, apiReadToken, genres } from '../globals/globalVariables';
import MovieCard from '../components/MovieCard';
import MovieSlider from '../components/MovieSlider';

import noPoster from '../imgs/no-image-poster.png';
function PageHome(){


	const [movies, setMovies] = useState([]);
	const [filter, setFilter] = useState(nowPlaying);
	const [genresList, setGenresList] = useState([]);

	// Search function 
	const [search, setSearch] = useState([]); // Searched movie name
	const [searchResult, setSearchResult] = useState([]); // Search results
	const changeHandler = e => {
		setSearch(e.target.value);
	}

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
		const fetchSearch = async () => {

			// Empty search
			if (search.trim() === "") {
				setSearch([]);
				setSearchResult([]);
				return;
			}

			const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}`, {
          
				headers: {
					accept: 'application/json',
					Authorization: 'Bearer '
					+apiReadToken
				}
            });
			let searchData = await response.json();
			setSearchResult(searchData.results.slice(0,3)); //top 3 results
		}
		fetchSearch();
	}, [search]);

	useEffect(() => {
        document.title = `${appTitle} - Home`;
    }, []);

	const [activeLink, setActiveLink] = useState('Now Playing');

	return (
		<main>
		
			{movies.length > 0 && <MovieSlider movies={movies} />}
	


			<section>
				<div className='search-filter-bar'>
					{/* filter btns */}
					<div className="movie-filters home-filter-grid">
						
						<button className={activeLink === 'Now Playing' ? 'active' : ''}onClick={() => {setFilter(nowPlaying); setActiveLink('Now Playing');}}>Now Playing</button>
						<button className={activeLink === 'Top Rated' ? 'active' : ''}onClick={() => {setFilter(topRated); setActiveLink('Top Rated');}}>Top Rated</button>
						<button className={activeLink === 'Upcoming' ? 'active' : ''}onClick={() => {setFilter(upcoming); setActiveLink('Upcoming');}}>Upcoming</button>
						<button className={activeLink === 'Popular' ? 'active' : ''}onClick={() => {setFilter(popular); setActiveLink('Popular');}}>Popular</button>
					</div>
					{/* https://www.youtube.com/watch?v=o1XcuaCcsDA - 'Search Bar with Auto Suggestions using API' section */}
					<div className='search-container'>
						<input className="search-bar"type="search" name="searchbar" id="searchbar" placeholder='search' onChange={changeHandler} value={search}/>
						{searchResult.length > 0 && 
							<div className='search-results'>
								{searchResult.map((result) => {
									return <div key={result.id} className='individual-search-result'>
												<img src={result.poster_path 
														? `https://image.tmdb.org/t/p/w500${result.poster_path}`
														: noPoster } 
														alt={result.title}/>
												<a href={`/details/${result.id}`}>{result.title}</a>
											</div>
								})}
							</div>
						}
					</div>
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