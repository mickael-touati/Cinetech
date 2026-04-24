const input = document.getElementById("search-input");
const resultsBox = document.getElementById("search-results");

let timeout = null;

input.addEventListener("input", () => {

    clearTimeout(timeout);

    timeout = setTimeout(async () => {

        const query = input.value;

        if (query.length < 2) {
            resultsBox.innerHTML = "";
            return;
        }

        const results = await searchMulti(query);

        resultsBox.innerHTML = "";

        results.forEach(item => {

            if (!item.poster_path) return;

            const div = document.createElement("div");
            div.classList.add("search-item");

            const img = `${IMG_URL}${item.poster_path}`;
            const title = item.title || item.name;

            div.innerHTML = `
                <img src="${img}" width="40">
                <span>${title}</span>
            `;

            div.addEventListener("click", () => {
                window.location.href = `pages/detail.html?id=${item.id}`;
            });

            resultsBox.appendChild(div);
        });

    }, 400);
});