export const appTitle = '.mov';
export const appAuthor = 'Emily Huang, Owen Chan.';
export const endPointSearch = 'https://api.thecatapi.com/v1/images/search?';
//url for getting particular images
export const endPointAllBreeds = 'https://api.thecatapi.com/v1/breeds';
// list of breeds for populating the dropdown
//reference list form api, find photo based on breed 
export const apiKey = 'Movie API goes here';
//we will need a key for the movie db, dont keep it in the file tho
//sensitive info, don't want git to access it 

//could do smthn like
export const apikey = import.meta.env.VITE_KITTEN_API;
//in root of project have a .env file and make a variable called VITE_KITTEN_API for example
// VITE_ is important, so vite knows we want access for our app 