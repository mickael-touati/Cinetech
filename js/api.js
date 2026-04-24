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

async function getMovieDetails(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();
    return data;
}

async function getMovieCredits(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();
    return data;
}

async function searchMulti(query) {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=fr-FR&query=${query}`);
    const data = await response.json();
    return data.results;
}

async function getSerieDetails(id) {
    const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();
    return data;
}

async function getSerieCredits(id) {
    const response = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();
    return data;
}

async function getSerieSimilaires(id) {
    const response = await fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();
    return data.results;
}


async function getMoviesByPage(page) {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-FR&page=${page}`);
    const data = await response.json();
    return data;
}

async function getSimilarMovies(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();
    return data.results;
}

async function getMovieReviews(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();
    return data.results;
}