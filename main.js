import { spillListe } from "./spill.js";

// 1. Fyll ut select-menyen automatisk med alle unike tags frå spillListe
function fyllUtSelectMeny() {
    let sjangerVelger = document.getElementById("sjangerVelger");

    if (!sjangerVelger) {
        console.error("Fann ikkje sjangerVelger på sida.");
        return;
    }

    // Tøm menyen og legg til eit standardval øvst
    sjangerVelger.innerHTML = '<option value="">Alle sjangere / tags</option>';

    // Samle ALLE tags frå alle spill inn i ei stor liste
    let alleTags = spillListe.flatMap(spill => spill.tags);

    // Fjern duplikat (Set) og sorter alfabetisk med støtte for norske bokstavar
    let unikeTags = [...new Set(alleTags)].sort((a, b) => a.localeCompare(b, "no"));

    // Lag ein <option> for kvar einaste unike tag
    unikeTags.forEach(tag => {
        let opt = document.createElement("option");
        opt.value = tag.toLowerCase();
        opt.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
        sjangerVelger.appendChild(opt);
    });
}

// 2. Søke- og filterfunksjon som viser visuelle kort
function hentSøk() {
    let søk = document.getElementById("søk").value.toLowerCase().trim();
    let valtSjanger = document.getElementById("sjangerVelger").value.toLowerCase();

    let funnetSpill = spillListe.filter(spill => {
        let treffSøk = søk === "" || 
            spill.navn.toLowerCase().includes(søk) || 
            spill.tags.some(tag => tag.toLowerCase().includes(søk));

        let treffSjanger = valtSjanger === "" || 
            spill.tags.some(tag => tag.toLowerCase() === valtSjanger);

        return treffSøk && treffSjanger;
    });

    let bekreftSøkElement = document.getElementById("bekreftSøk");
    
    // Sjekk om det finst ein resultatboks på sida, viss ikkje lagar me ein automatisk under startside
    let resultatBoks = document.getElementById("resultatBoks");
    if (!resultatBoks) {
        resultatBoks = document.createElement("div");
        resultatBoks.id = "resultatBoks";
        resultatBoks.className = "resultat-grid";
        document.body.appendChild(resultatBoks);
    }

    // Tøm tidlegare resultat
    resultatBoks.innerHTML = "";

    if (funnetSpill.length > 0) {
        bekreftSøkElement.innerHTML = `Fant ${funnetSpill.length} spill:`;

        // Lag eit visuelt kort for kvart spel som passar
        funnetSpill.forEach(spill => {
            let kort = document.createElement("div");
            kort.className = "spel-kort";

            let tittel = document.createElement("h3");
            tittel.textContent = spill.navn;
            kort.appendChild(tittel);

            let tagContainer = document.createElement("div");
            tagContainer.className = "tag-liste";

            spill.tags.forEach(tag => {
                let tagSpan = document.createElement("span");
                tagSpan.className = "tag";
                tagSpan.textContent = tag;
                tagContainer.appendChild(tagSpan);
            });

            kort.appendChild(tagContainer);
            resultatBoks.appendChild(kort);
        });

    } else {
        bekreftSøkElement.innerHTML = "Fant ingen spill.";
    }
}

// --- KJØR IGONG ---

// Fyll nedtrekksmenyen med ein gong sida lastar
fyllUtSelectMeny();

// Kjøyr søk når knappen vert klikka
document.getElementById("søkKnapp").addEventListener("click", hentSøk);

// Kjøyr søk når ein trykkjer "Enter" i søkefeltet
document.getElementById("søk").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        hentSøk();
    }
});

// Kjøyr søk med ein gong brukaren endrar noko i nedtrekksmenyen
document.getElementById("sjangerVelger").addEventListener("change", hentSøk);