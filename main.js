import { spillListe } from "./spill.js"

function hentSøk(){
    let søk = document.getElementById("søk").value.toLowerCase().trim(); //Setter inputen frå nettsida til ein variabel i JS
    console.log(søk)
    
    let funnetSpill = spillListe.find(spill =>
        spill.namn.toLowerCase() === søk || spill.tags.includes(søk)
    );

    if (funnetSpill) {
        document.getElementById("bekreftSøk").innerHTML = "Fant spill: " + funnetSpill.namn;
    } else {
        document.getElementById("bekreftSøk").innerHTML = "Fant ingen spill.";
    }
}
// Dette forteller JavaScript at den skal kjøre hentSøk når knappen klikkes
document.getElementById("søkKnapp").addEventListener("click", hentSøk);