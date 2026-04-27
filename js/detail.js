// PARAMS
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

// DOM
const detailContainer = document.getElementById("detail-container");
const similarContainer = document.getElementById("similar-container");
const reviewsContainer = document.getElementById("reviews-container");
const similarTitle = document.getElementById("similar-title");

const commentInput = document.getElementById("comment-input");
const addBtn = document.getElementById("add-comment");
const userCommentsContainer = document.getElementById("user-comments");



// ==================== FILM ====================

async function displayMovie() {

    const movie = await getMovieDetails(id);
    const credits = await getMovieCredits(id);
    const similar = await getSimilarMovies(id);
    const reviews = await getMovieReviews(id);

    const director = credits.crew.find(p => p.job === "Director");

    detailContainer.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${IMG_URL}${movie.poster_path}">
        <p>${movie.overview}</p>
        <p>Réalisateur : ${director ? director.name : "Inconnu"}</p>
    `;

    displaySimilar(similar, false);
    displayReviews(reviews);
}



// ==================== SERIE ====================

async function displaySerie() {

    const serie = await getSerieDetails(id);
    const similar = await getSerieSimilaires(id);

    detailContainer.innerHTML = `
        <h2>${serie.name}</h2>
        <img src="${IMG_URL}${serie.poster_path}">
        <p>${serie.overview}</p>
    `;

    displaySimilar(similar, true);
}



// ==================== SIMILAIRES ====================

function displaySimilar(list, isSerie) {

    similarContainer.innerHTML = "";

    list.slice(0, 6).forEach(item => {

        if (!item.poster_path) return;

        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${IMG_URL}${item.poster_path}">
            <h3>${item.title || item.name}</h3>
        `;

        div.onclick = () => {
            if (isSerie) {
                window.location.href = `detail.html?type=serie&id=${item.id}`;
            } else {
                window.location.href = `detail.html?id=${item.id}`;
            }
        };

        similarContainer.appendChild(div);
    });
}



// ==================== REVIEWS API ====================

function displayReviews(reviews) {

    reviewsContainer.innerHTML = "";

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = "<p>Aucun avis pour le moment</p>";
        return;
    }

    reviews.forEach(r => {

        const div = document.createElement("div");

        div.innerHTML = `
            <h4>${r.author}</h4>
            <p>${r.content}</p>
        `;

        reviewsContainer.appendChild(div);
    });
}



// ==================== LOCAL STORAGE ====================

// récupérer commentaires
function getComments() {
    const data = localStorage.getItem(id);
    return data ? JSON.parse(data) : [];
}

// sauvegarder commentaires
function saveComments(comments) {
    localStorage.setItem(id, JSON.stringify(comments));
}

// afficher commentaires
function displayUserComments() {

    const comments = getComments();
    userCommentsContainer.innerHTML = "";

    comments.forEach((comment, index) => {

        const div = document.createElement("div");

        div.innerHTML = `
            <p>${comment.text}</p>
            <button>Répondre</button>
            <div class="replies"></div>
        `;

        const repliesContainer = div.querySelector(".replies");

        // afficher réponses
        if (comment.replies) {
            comment.replies.forEach(rep => {
                const p = document.createElement("p");
                p.textContent = "- " + rep;
                repliesContainer.appendChild(p);
            });
        }

        // bouton répondre
        const btn = div.querySelector("button");

        btn.onclick = () => {

            const reply = prompt("Votre réponse :");

            if (!reply) return;

            comments[index].replies = comments[index].replies || [];
            comments[index].replies.push(reply);

            saveComments(comments);
            displayUserComments();
        };

        userCommentsContainer.appendChild(div);
    });
}



// ajouter commentaire
addBtn.onclick = () => {

    const text = commentInput.value;

    if (text === "") return;

    const comments = getComments();

    comments.push({
        text: text,
        replies: []
    });

    saveComments(comments);

    commentInput.value = "";

    displayUserComments();
};



// ==================== INIT ====================

if (type === "serie") {
    similarTitle.textContent = "Séries similaires";
    displaySerie();
} else {
    similarTitle.textContent = "Films similaires";
    displayMovie();
}

displayUserComments();