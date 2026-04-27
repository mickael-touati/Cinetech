const input = document.getElementById("search-input");
const resultsBox = document.getElementById("search-results");

let timeout;

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

            const title = item.title || item.name;

            div.innerHTML = `
                <img src="${IMG_URL}${item.poster_path}" width="40">
                <span>${title}</span>
            `;

            div.onclick = () => {
                if (item.media_type === "tv") {
                    window.location.href = `pages/detail.html?type=serie&id=${item.id}`;
                } else {
                    window.location.href = `pages/detail.html?id=${item.id}`;
                }
            };

            resultsBox.appendChild(div);
        });

    }, 400);
});