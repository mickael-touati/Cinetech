// CONFIG API

// FILMS

async function getPopularMovies() {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`);
    const data = await res.json();
    return data.results;
}

async function getMoviesByPage(page) {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-FR&page=${page}`);
    const data = await res.json();
    return data;
}

async function getMovieDetails(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
    return await res.json();
}

async function getMovieCredits(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();
    return data;
}

async function getSimilarMovies(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=fr-FR`);
    const data = await res.json();
    return data.results;
}

async function getMovieReviews(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=fr-FR`);
    const data = await res.json();
    return data.results;
}

// SERIES

async function getSeriesPopulaires() {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=fr-FR`);
    const data = await res.json();
    return data.results;
}

async function getSerieDetails(id) {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=fr-FR`);
    return await res.json();
}

async function getSerieCredits(id) {
    const res = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=fr-FR`);
    return await res.json();
}

async function getSerieSimilaires(id) {
    const res = await fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=fr-FR`);
    const data = await res.json();
    return data.results;
}

// SEARCH

async function searchMulti(query) {
    const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=fr-FR&query=${query}`);
    const data = await res.json();
    return data.results;
}