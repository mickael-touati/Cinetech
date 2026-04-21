async function testAPI() {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=fr-FR`);
    const data = await response.json();
    console.log(data);
}

testAPI();