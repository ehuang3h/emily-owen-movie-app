//Dummy Favs Button


function FavsButton({ movieObj, isFav, handleFavClick }) {

    function handleAdd() {
        handleFavClick(true, movieObj);
    }

    function handleRemove() {
        handleFavClick(false, movieObj);
    }

    return (
        <>
            {isFav ?
                <button className="favs-button"onClick={handleRemove}><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5d8bec"><path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Z"/></svg></button> :
                <button className="favs-button"onClick={handleAdd}><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#5d8bec"><path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Zm60-91 220-93 220 93v-574H260v574Zm0-574h440-440Z"/></svg></button>
            }
        </>
    );
}

export default FavsButton;