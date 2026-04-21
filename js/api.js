async function getSeriesPopulaires() {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();
    return data.results;
}

async function getPopularMovies() {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`);
    const data = await response.json();
    return data.results;
}