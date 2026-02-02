// Page Home

import { useEffect, useState } from 'react';
import { appTitle , nowPlaying, topRated, upcoming, popular, apiReadToken} from '../globals/globalVariables';
import MovieCard from '../components/MovieCard';

function PageHome(){


	const [movies, setMovies] = useState([]);

	 useEffect(() => {
        const fetchNowPlayingMovies = async () => {
            
            const response = await fetch(nowPlaying, {
          
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
    }, []);

	

	return (
		<main>
            <section>
               {/* carousel */}
                
            </section>

			<section>
				<input type="search" name="searchbar" id="searchbar" placeholder='search' />

		
				<div className="movieCards">
					{movies && movies.map(movie =>{return(
					
							<MovieCard imgPath={movie.poster_path} title={movie.title}/>
						);
					})}
                        
                    
					

					
				</div>
				

			</section>
        </main>
	);

}

export default PageHome;