import React from 'react'
import HeroSlider , { Slide, AutoplayButton }from 'hero-slider'
function MovieSlider({}) {
  return (
    <HeroSlider 
    height={"40vh"} 
    autoplay={{
        // Configure autoplay
        shouldAutoplay: true,
        autoplayDuration: 5000, // 5 seconds
        autoplayHandlerTimeout: 0,
      }}>

       {/* get 3 movies from now playing? */}
       {/* grab title, and place a read more button on each slide  */}
        <Slide background ={{}}></Slide>

        <Slide background ={{}}></Slide>

        <Slide background ={{}}></Slide>

    </HeroSlider>
  )
}

export default MovieSlider