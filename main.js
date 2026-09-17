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
