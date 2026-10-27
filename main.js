import { spillListe } from "./spill.js"

function hentSøk(){
    let søk = document.getElementById("søk").value.toLowerCase().trim(); //Setter inputen frå nettsida til ein variabel i JS
    console.log(søk)
    
    let funnetSpill = spillListe.filter(spill =>
        spill.namn.toLowerCase() === søk || spill.tags.includes(søk)
    );

    if (funnetSpill.length > 0) {
        let spillNamn = funnetSpill.map(spill => spill.namn).join(", ");
        document.getElementById("bekreftSøk").innerHTML = "Fant spill: " + spillNamn;
    } else {
        document.getElementById("bekreftSøk").innerHTML = "Fant ingen spill.";
    }
}
// Dette forteller JavaScript at den skal kjøre hentSøk når knappen klikkes
document.getElementById("søkKnapp").addEventListener("click", hentSøk);