async function fetchGameData() {
    const query = document.getElementById('game-search').value;
    const displayDiv = document.getElementById('game-display');
    const apiKey = 'YOUR_API_KEY'; // Grab a free key from rawg.io/apidocs

    // 1. Build the dynamic search URL
    const url = `https://rawg.io{apiKey}&search=${query}`;
 
    try {
        // 2. Fetch data from RAWG servers
        let response = await fetch(url);
        let data = await response.json();

        // 3. Take the very first game result found
        let game = data.results[0]; 

        if (game) {
            // 4. Inject the information right into your webpage HTML
            displayDiv.innerHTML = `
                <h2>${game.name}</h2>
                <p><strong>Released:</strong> ${game.released}</p>
                <p><strong>Rating:</strong> ⭐ ${game.rating} / 5</p>
                <img src="${game.background_image}" width="400" alt="${game.name}">
            `;
        } else {
            displayDiv.innerHTML = `<p>No games found by that name.</p>`;
        }
    } catch (error) {
        console.error("Error fetching data from API:", error);
    }
}

import { Fortnite } from "./spill.js"

function hentSøk(){
    let søk = document.getElementById("søk").value.toLowerCase().trim(); //Setter inputen frå nettsida til ein variabel i JS
    console.log(søk)
    
    if (Fortnite.tags.includes(søk) || søk === Fortnite.namn.toLowerCase()){
        document.getElementById("bekreftSøk").innerHTML = "Fant spill: " + Fortnite.namn;
    } else{
        document.getElemntById("bekreftSøk").innerHTML = "Fant ingen spill";
    }
}
// Dette forteller JavaScript at den skal kjøre hentSøk når knappen klikkes
document.getElementById("søkKnapp").addEventListener("click", hentSøk);
