const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const detailContainer = document.getElementById("detail-container");

async function displayDetail() {

    const movie = await getMovieDetails(id);
    const credits = await getMovieCredits(id);

    const img = `${IMG_URL}${movie.poster_path}`;

    const actors = credits.cast
        .slice(0, 5)
        .map(a => a.name)
        .join(", ");

    const director = credits.crew.find(p => p.job === "Director");

    detailContainer.innerHTML = `
        <h2>${movie.title}</h2>

        <img src="${img}">

        <p>${movie.release_date}</p>

        <p>${movie.overview}</p>

        <p><strong>Réalisateur :</strong> ${director ? director.name : "Inconnu"}</p>

        <p><strong>Acteurs :</strong> ${actors}</p>
    `;
}

displayDetail();

async function displaySerieDetail() {
    const serie = await getSerieDetails(id);
    const credits = await getSerieCredits(id);
    const similaires = await getSerieSimilaires(id);

    const img = `${IMG_URL}${serie.poster_path}`;

    const actors = credits.cast
        .slice(0, 5)
        .map(a => a.name)
        .join(", ");

    const createur = serie.created_by.length > 0 ? serie.created_by[0].name : "Inconnu";

    detailContainer.innerHTML = `
        <h2>${serie.name}</h2>
        <img src="${img}">
        <p>${serie.first_air_date}</p>
        <p>${serie.overview}</p>
        <p><strong>Créateur :</strong> ${createur}</p>
        <p><strong>Acteurs :</strong> ${actors}</p>
        <p><strong>Saisons :</strong> ${serie.number_of_seasons}</p>
    `;

    const similairesContainer = document.createElement("div");
    similairesContainer.innerHTML = "<h2>Séries similaires</h2>";
    similaires.slice(0, 6).forEach(s => {
        const carte = document.createElement("div");
        carte.classList.add("serie-card");
        carte.innerHTML = `
            <img src="${IMG_URL}${s.poster_path}" alt="${s.name}">
            <h3>${s.name}</h3>
        `;
        carte.addEventListener("click", () => {
            window.location.href = `detail.html?type=serie&id=${s.id}`;
        });
        similairesContainer.appendChild(carte);
    });
    document.querySelector("main").appendChild(similairesContainer);
}

const type = params.get("type");
if (type === "serie") {
    displaySerieDetail();
} else {
    displayDetail();
}