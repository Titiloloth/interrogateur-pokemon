// Mon apparence

document.getElementById("modal").style.display = 'none'
let radioName = document.getElementById("radioName")
let radioElement = document.getElementById("radioElement")
const URL_API = "https://pokebuildapi.fr/api/v1/"
// Mes API

let datasFetch;
let urlApiPokemon = URL_API + "pokemon/limit/25";
await getDataFetch();
async function getDataFetch () {
    let res = await fetch(urlApiPokemon);
    datasFetch = await res.json();
}

let datasFetchTypes;
let urlApiTypes = URL_API + "types";
await getDataFetchTypes();
async function getDataFetchTypes () {
    let resTypes = await fetch(urlApiTypes);
    datasFetchTypes = await resTypes.json();
}

let urlPokemonParType = URL_API + "pokemon/type/"
async function getDataFetchPokemonParType (type) {
    let res = await fetch(urlPokemonParType + type);
    res.json()
        .then(element =>{
            element = element.slice(0,3);
            document.getElementById("modal").style.display = 'flex';
            let imagePokemon2 = document.getElementById("imagepokemon");
            imagePokemon2.style.display = 'none'
            let nomPokemon = document.getElementById("nompokemon");
            nomPokemon.innerHTML = element[0].name + "\n" + element[1].name + "\n" + element[2].name
        });
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
    
     getDataFetchPokemonParType(choix)
   
   
    // let imagePokemon2 = document.getElementById("imagepokemon");
    // imagePokemon2.style.display = 'none'
        
    // let nomPokemon = document.getElementById("nompokemon");
    // nomPokemon.textContent = "Voici les pokemons de ce type : " + datasFetchPokemonParType
}


