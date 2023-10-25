// Méthode Fetch
document.getElementById("modal").style.display = 'none'

let datasFetch;
const urlApi = "https://pokebuildapi.fr/api/v1/pokemon/limit/25";
await getDataFetch();
async function getDataFetch () {
    const res = await fetch(urlApi);
    datasFetch = await res.json();
}

// Liste de pokemons 

datasFetch.forEach(unPokemon => {
    let option = document.createElement('option')
    option.textContent = unPokemon.name;
    option.value = unPokemon.name;
    document.querySelector("select").appendChild(option);
})

document.querySelector("button").addEventListener("click", function(){
    let choix = document.querySelector("select").value;
    AfficherPokemon(choix);
})

function AfficherPokemon(choix) {
    let pokemonActif = datasFetch.find( pokemon => pokemon.name == choix);
    document.getElementById("modal").style.display = 'flex';
    let nomPokemon = document.getElementById("nompokemon");
    nomPokemon.textContent = "Voici les informations de " + choix;
    let imagePokemon = document.getElementById("imagepokemon");
    imagePokemon.src = pokemonActif.image;
    let typesPokemon = "" 
    pokemonActif.apiTypes.forEach(type => {
    typesPokemon += `${type.name}/`; 
        
    });
    typesPokemon = typesPokemon.substring(typesPokemon.length-1,0);
    let divTypesPokemon = document.getElementById("typespokemon")
    divTypesPokemon.innerText = typesPokemon
}






