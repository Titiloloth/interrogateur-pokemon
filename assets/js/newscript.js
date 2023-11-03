// INITIALISATION

let boutons = document.querySelector("input")
boutons.checked = false 

let boutonNom = document.getElementById("radioName")
let boutonElement = document.getElementById("radioElement")

let liste = document.querySelector("select");
let option = document.createElement("option");
let choix = liste.value

const URL_API = "https://pokebuildapi.fr/api/v1/"

let listePokemons;
let urlApiPokemon = URL_API + "pokemon/limit/25";
await getListePokemons();
async function getListePokemons () {
    let res = await fetch(urlApiPokemon);
    listePokemons = await res.json();
}

let listeElements;
let urlApiElements = URL_API + "types";
await getDataFetchElements();
async function getDataFetchElements () {
    let resElements = await fetch(urlApiElements);
    listeElements = await resElements.json();
}

// let listePPE; //PPE = Pokemon Par Element
// let urlApiPPE = URL_API + "pokemon/type/";
// await getDataFetchPPE(type);
// async function getDataFetchPPE () {
//     let resPPE = await fetch(urlApiPPE + type);
//     // resPPE.json();
// }

//ALGORITHME

if (boutonElement.checked){
console.log(boutons.value)
} 