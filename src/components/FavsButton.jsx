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
                <button onClick={handleRemove}>Remove From Favs</button> :
                <button onClick={handleAdd}>Add To Favs</button>
            }
        </>
    );
}

export default FavsButton;