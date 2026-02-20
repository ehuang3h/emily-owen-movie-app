// PAGE ABOUT 

import { useEffect } from 'react';
import { appTitle } from '../globals/globalVariables';
// Images
import tmdbLogo from '../imgs/tmdbLogo.svg';

function PageAbout() {

	useEffect(() => {
		document.title = `${appTitle} - About`;
	}, []);

    return (
        <main>
            <section>
                <h1>.mov</h1>
                <p>.mov is a movie database built for film fanatics passionate about finding their next movie to binge.  Users can search, filter, and save movies to their favorites list, or discover new movie recommendations based on their favorite films.</p>
                <p><em>This product uses the TMDb API but is not endorsed or certified by TMDb.</em></p>
                <img id='tmdb-logo' src={tmdbLogo} alt='TMDB logo'/>
            </section>
        </main>
    );
	
}

export default PageAbout;