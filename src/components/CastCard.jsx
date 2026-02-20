// CastCard: LAYOUT COMPONENT FOR EACH CAST MEMBER 
function CastCard({name, imgPath}){
    return (
        <div className='cast-card'>
            <div className='circular-cast-photo'>
                <img 
                    className="cast-photo"
                    src={`https://image.tmdb.org/t/p/w500${imgPath}`} 
                    alt={name}
                />
            </div>
            <p>{name}</p>
        </div>
    );
}

export default CastCard;