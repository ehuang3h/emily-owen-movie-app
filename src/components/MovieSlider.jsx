import HeroSlider, { Slide, Nav, Overlay } from 'hero-slider';
import { Link } from 'react-router-dom';
import 'hero-slider/dist/index.css';
import * as HeroSliderExports from 'hero-slider';
console.log(HeroSliderExports);
// console.log(HeroSlider)
function MovieSlider({ movies }) {

    //first 3 movies
    const sliderMovies = movies.slice(0, 3);
    console.log(sliderMovies.map(m => m.backdrop_path));
    //readme,documentation
  // https://github.com/rmolinamir/hero-slider
    return (
        
          <div className='slider-area'>
            <HeroSlider height={"60vh"} autoplay={{ shouldAutoplay: true, autoplayDuration: 5000 }}>
                
                {sliderMovies.map(movie => (
                    <Slide
                        // key={movie.id}
                        // background={{
                        //     backgroundImageSrc: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
                        //     backgroundAttachment: 'fixed'
                        // }}
                    ><div className='slide-img-container'><img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" /></div>
                        <Overlay>
                            <div className="slide-content">
                                <h2>{movie.title}</h2>
                                <Link to={`/details/${movie.id}`}>Read More</Link>
                            </div>
                        </Overlay>
                    </Slide>
                ))}
    
                <Nav />
    
            </HeroSlider>
          </div>
  
    );
}

export default MovieSlider;