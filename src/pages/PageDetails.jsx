// Page Favs

import { useEffect } from 'react';
import { appTitle } from '../globals/globalVariables';

function PageDetails() {

    useEffect(() => {
        document.title = `${appTitle} - details`;
    }, []);

    return (
        <main>
            <section>
                <h2>About .MOV</h2>
                
            </section>
        </main>
    );
    
}

export default PageDetails;
