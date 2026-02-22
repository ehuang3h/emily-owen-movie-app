// CastCard: LAYOUT COMPONENT FOR EACH CAST MEMBER 

import noPoster from '../imgs/no-image-poster.png';

function CastCard({name, imgPath}){
    return (
        <div className='cast-card'>
            <div className='circular-cast-photo'>
                <img 
                    className="cast-photo"
                    src={imgPath 
                        ? `https://image.tmdb.org/t/p/w500${imgPath}`
                        : noPoster} 
                    alt={name}
                />
            </div>
            <p>{name}</p>
        </div>
    );
}

export default CastCard;