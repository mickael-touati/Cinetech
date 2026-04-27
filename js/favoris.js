function getFavoris() {
    return JSON.parse(localStorage.getItem("favoris")) || [];
}

function afficherFavoris() {
    const favoris = getFavoris();
    const container = document.getElementById("favoris-container");

    container.innerHTML = "";

    if (favoris.length === 0) {
        container.innerHTML = "<p>Vous n'avez pas encore de favoris</p>";
        return;
    }

    favoris.forEach(item => {
        const carte = document.createElement("div");
        carte.classList.add("serie-card");
        
        carte.innerHTML = `
            <img src="${IMG_URL}${item.affiche}" alt="${item.titre}">
            <h3>${item.titre}</h3>
            <p>${item.note}</p>
            <button class="btn-retirer" data-id="${item.id}">Retirer</button>
        `;
        container.appendChild(carte);
    });

    document.querySelectorAll(".btn-retirer").forEach(btn => {
        btn.addEventListener("click", (e) => {
            retirerFavori(e.target.dataset.id);
        });
    });
}

function retirerFavori(id) {
    let favoris = getFavoris();
    favoris = favoris.filter(item => item.id !== parseInt(id));
    localStorage.setItem("favoris", JSON.stringify(favoris));
    afficherFavoris();
}

afficherFavoris();