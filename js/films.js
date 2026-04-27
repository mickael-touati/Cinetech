// PAGE FILMS

const container = document.getElementById("movies-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("page-info");

let currentPage = 1;
let totalPages = 1;

async function displayMovies(page) {
    const data = await getMoviesByPage(page);

    container.innerHTML = "";

    data.results.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = `${IMG_URL}${movie.poster_path}`;

        card.innerHTML = `
            <img src="${img}">
            <h3>${movie.title}</h3>
        `;

        card.addEventListener("click", () => {
            window.location.href = `detail.html?id=${movie.id}`;
        });

        container.appendChild(card);
    });

    totalPages = data.total_pages;
    pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;
}

prevBtn.onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        displayMovies(currentPage);
    }
};

nextBtn.onclick = () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayMovies(currentPage);
    }
};

displayMovies(currentPage);