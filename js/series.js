let pageCourante = 1;

async function getSeriesPage(page) {
    const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=fr-FR&page=${page}`);
    const data = await response.json();
    return data;
}

async function afficherSeriesPage() {
    const data = await getSeriesPage(pageCourante);
    const container = document.getElementById("series-container");
    container.innerHTML = "";

    data.results.forEach(serie => {
        const carte = document.createElement("div");
        carte.classList.add("serie-card");
        carte.innerHTML = `
            <img src="${IMG_URL}${serie.poster_path}" alt="${serie.name}">
            <h3>${serie.name}</h3>
            <p>${serie.vote_average}</p>
        `;
        container.appendChild(carte);
    });

    document.getElementById("page-actuelle").textContent = `Page ${pageCourante} / ${data.total_pages}`;
}

document.getElementById("btn-suivant").addEventListener("click", () => {
    pageCourante++;
    afficherSeriesPage();
});

document.getElementById("btn-precedent").addEventListener("click", () => {
    if (pageCourante > 1) {
        pageCourante--;
        afficherSeriesPage();
    }
});

afficherSeriesPage();