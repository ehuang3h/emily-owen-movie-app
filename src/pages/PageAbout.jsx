// Page Favs

import { useEffect } from 'react';
import { appTitle } from '../globals/globalVariables';

function PageAbout() {

	useEffect(() => {
		document.title = `${appTitle} - About`;
	}, []);

    return (
        <main>
		    <section>
                <h2>About .MOV</h2>
                
            </section>
	    </main>
    );
	
}

export default PageAbout;
