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
                <h2>Your favourites</h2>
                
            </section>
        </main>
    );
    
}

export default PageFavs;
