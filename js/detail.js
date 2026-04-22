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