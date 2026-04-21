const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("ID du film :", id);

const detailContainer = document.getElementById("detail-container");

detailContainer.innerHTML = `<p>Film ID : ${id}</p>`;