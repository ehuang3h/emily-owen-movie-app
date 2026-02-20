import { createSlice } from '@reduxjs/toolkit';
import { appStorageName } from '../globals/globalVariables';

function getFavsFromLocalStorage() {
    const favs = localStorage.getItem(appStorageName);
    if (favs !== null) {
        return {
            items: JSON.parse(favs)
        };
    }
    return {
        items: []
    };
}

const favsFromLocalStorage = getFavsFromLocalStorage();

const initialState = {
    items: favsFromLocalStorage.items
};

function getIndex(item, arr) {
    return arr.findIndex(arrItem => arrItem.id === item.id);
}

export const favsSlice = createSlice({
    name: 'favs',
    initialState,
    reducers: {
        addFav: (state, action) => {
            const newFavs = [...state.items, { ...action.payload, dateAdded: Date.now() }];
            localStorage.setItem(appStorageName, JSON.stringify(newFavs));
            state.items = newFavs;
        },
        deleteFav: (state, action) => {
            const itemsCopy = [...state.items];
            itemsCopy.splice(getIndex(action.payload, state.items), 1);
            localStorage.setItem(appStorageName, JSON.stringify(itemsCopy));
            state.items = itemsCopy;
        }
    }
});

export const { addFav, deleteFav } = favsSlice.actions;

export default favsSlice.reducer;