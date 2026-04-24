const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const detailContainer = document.getElementById("detail-container");
const similarContainer = document.getElementById("similar-container");
const reviewsContainer = document.getElementById("reviews-container");

async function displayDetail() {

    const movie = await getMovieDetails(id);
    const credits = await getMovieCredits(id);
    const similar = await getSimilarMovies(id);
    const reviews = await getMovieReviews(id);

    const img = `${IMG_URL}${movie.poster_path}`;

    const director = credits.crew.find(p => p.job === "Director");

    const actors = credits.cast
        .slice(0, 5)
        .map(a => a.name)
        .join(", ");

    detailContainer.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${img}">
        <p>${movie.release_date}</p>
        <p>${movie.overview}</p>
        <p>Réalisateur : ${director ? director.name : "Inconnu"}</p>
        <p>Acteurs : ${actors}</p>
    `;

    similarContainer.innerHTML = "";

    similar.slice(0, 6).forEach(movie => {

        const div = document.createElement("div");
        div.classList.add("movie-card");

        const img = `${IMG_URL}${movie.poster_path}`;

        div.innerHTML = `
            <img src="${img}">
            <h3>${movie.title}</h3>
        `;

        div.addEventListener("click", () => {
            window.location.href = `detail.html?id=${movie.id}`;
        });

        similarContainer.appendChild(div);
    });

    reviewsContainer.innerHTML = "";

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = "<p>Aucun avis pour le moment</p>";
        return;
    }

    reviews.forEach(review => {

        const div = document.createElement("div");

        div.innerHTML = `
            <h4>${review.author}</h4>
            <p>${review.created_at}</p>
            <p>${review.content}</p>
        `;

        reviewsContainer.appendChild(div);
    });
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