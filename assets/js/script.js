// Mon apparence

document.getElementById("modal").style.display = 'none'
let radioName = document.getElementById("radioName")
let radioElement = document.getElementById("radioElement")


// Mes API

let datasFetch;
const urlApi = "https://pokebuildapi.fr/api/v1/pokemon/limit/25";
await getDataFetch();
async function getDataFetch () {
    const res = await fetch(urlApi);
    datasFetch = await res.json();
}

let datasFetchTypes;
const urlApiTypes = "https://pokebuildapi.fr/api/v1/types";
await getDataFetchTypes();
async function getDataFetchTypes () {
    const resTypes = await fetch(urlApiTypes);
    datasFetchTypes = await resTypes.json();
}

// NOMS

//Affichage liste 

radioName.addEventListener("click", function(){
document.querySelector("select").options.length = 0
datasFetch.forEach(unPokemon => {
    let option = document.createElement('option')
    option.textContent = unPokemon.name;
    option.value = unPokemon.name;
    document.querySelector("select").appendChild(option);
})

//Appui bouton

document.querySelector("button").addEventListener("click", function(){
    let choix = document.querySelector("select").value;
    AfficherPokemonParNom(choix);
})

function AfficherPokemonParNom(choix) {
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
})

// ELEMENTS

//Affichage liste 

radioElement.addEventListener("click", function(){
    document.querySelector("select").options.length = 0
    datasFetchTypes.forEach(unType => {
        let optionTypes = document.createElement('option')
        optionTypes.textContent = unType.name;
        optionTypes.value = unType.name;
        document.querySelector("select").appendChild(optionTypes);
    })
    })

    //Appui bouton

    document.querySelector("button").addEventListener("click", function(){
        let choix = document.querySelector("select").value;
        AfficherPokemonParElement(choix);
    })

    function AfficherPokemonParElement(choix) {
        let elementActif = datasFetch.find( elementPokemon => elementPokemon.apiTypes == choix);
        document.getElementById("modal").style.display = 'flex';
        // let imagePokemon2 = document.getElementById("imagepokemon");
        // imagePokemon2.style.display = 'none'
        let nomPokemon = document.getElementById("nompokemon");
        nomPokemon.textContent = "Voici les pokemons de ce type : " + elementActif
    }


