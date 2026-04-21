async function afficherSeries() {
    const series = await getSeriesPopulaires();

    const container = document.getElementById("series-container");

    series.forEach(serie => {
        const carte = document.createElement("div");
        carte.innerHTML = `
            <img src="${IMG_URL}${serie.poster_path}" alt="${serie.name}">
            <h3>${serie.name}</h3>
            <p>${serie.vote_average}</p>
        `;
        container.appendChild(carte);
    });
}

afficherSeries();
