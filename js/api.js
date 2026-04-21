const API_KEY = "9f8009805593fc486721d2d3941d012c";

const BASE_URL = "https://api.themoviedb.org/3";

async function getPopularMovies() {

    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`;

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}