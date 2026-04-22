const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const detailContainer = document.getElementById("detail-container");

async function displayDetail() {

    const movie = await getMovieDetails(id);

    const img = `${IMG_URL}${movie.poster_path}`;

    detailContainer.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${img}">
        <p>${movie.release_date}</p>
        <p>${movie.overview}</p>
    `;
}

displayDetail();