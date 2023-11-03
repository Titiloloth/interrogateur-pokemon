// INITIALISATION

let modalNom = document.getElementById("modal")
modalNom.style.display = "none"

let bouton = document.querySelector("button")

let boutonNom = document.getElementById("radioName")
boutonNom.checked = true
let boutonElement = document.getElementById("radioElement")

let liste = document.querySelector("select");

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

let urlApiPPE = URL_API + "pokemon/type/";
let type = ""
async function getDataFetchPPE (type) {
    let resPPE = await fetch(urlApiPPE + type);
    let listePPE = await resPPE.json();
    return listePPE.slice(0,3);
}

//--ALGORITHME

//Génération listes

afficherListeNoms()

boutonNom.addEventListener("change", function(){
    afficherListeNoms()
})

boutonElement.addEventListener("change", function(){
    afficherListeElements()
})

//Appui boutons

bouton.addEventListener("click", function (){
    afficherModal()
        
})

//--FONCTIONS 

function init(){
        window.location.reload()
}

function afficherListeNoms() {
    if (boutonNom.checked){
        liste.options.length = 1
        listePokemons.forEach(unPokemon => {
            let option = document.createElement('option')
            option.textContent = unPokemon.name;
            option.value = unPokemon.name;
           liste.appendChild(option);
        })
    } 
}

function afficherListeElements() {
    if (boutonElement.checked){
        liste.options.length = 1
        listeElements.forEach(unType => {
            let option = document.createElement('option')
            option.textContent = unType.name;
            option.value = unType.name;
           liste.appendChild(option);
        })
    } 
}

async function afficherModal() {
    if (boutonNom.checked){
        let choix = liste.value
        let pokemonActif = listePokemons.find( pokemon => pokemon.name == choix);

        //Pop-up
        let modalNom = document.getElementById("modal")
        modalNom.style.display = "flex"
        document.getElementById("retour").addEventListener("click", function(){
            init()
        })

        //Nom du pokemon
        document.getElementById("div1").textContent = "Voici les informations de " + choix

        //Image du pokemon
        let imagePokemon = document.createElement("img")
        imagePokemon.setAttribute("id", "imagepokemon")
        imagePokemon.src = pokemonActif.image
        document.getElementById("div2").appendChild(imagePokemon)

        //Element du pokemon
        let elementPokemon = ""
        pokemonActif.apiTypes.forEach(type => {
            elementPokemon += `${type.name}/`; 
                
            });
        elementPokemon = elementPokemon.substring(elementPokemon.length-1,0);
        document.getElementById("div3").textContent = elementPokemon

        //Stats du pokemon
        document.getElementById("div4").textContent = "HP: " + pokemonActif.stats.HP + " | Attaque: " + pokemonActif.stats.attack + " | Defense: " + pokemonActif.stats.defense

        //Evolution du pokemon
        console.log(pokemonActif)
        let evolutionPokemon = ""
        pokemonActif.apiEvolutions.forEach(evolution => {
            evolutionPokemon += `${evolution.name}/`; 
        })
        evolutionPokemon = evolutionPokemon.substring(evolutionPokemon.length-1,0);
        document.getElementById("div5").textContent = "Evolution: " + evolutionPokemon
        if (evolutionPokemon == ""){
            document.getElementById("div5").style.visibility = "hidden"
        }

    } else if (boutonElement.checked){

        let choix = liste.value
        let type = choix
        let result = await getDataFetchPPE(type)
        
        //Pop-up
        let modalNom = document.getElementById("modal")
        modalNom.style.display = "flex"
        document.getElementById("retour").addEventListener("click", function(){
            init()
        })

        //Phrase
        document.getElementById("div1").innerHTML = "Voici 3 pokemons de type " + choix + "<br><br>"
        
        //Liste des trois pokemons
        document.getElementById("div2").innerHTML = "1. " + result[0].name + "<br> 2. " + result[1].name + "<br> 3. " + result[2].name

    }
}