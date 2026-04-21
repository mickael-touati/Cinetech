async function getSeriesPopulaires() { //Appelle l'api retoune la liste
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();
    return data.results;
}

