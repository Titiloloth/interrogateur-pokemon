//COSMETIQUE

document.getElementById("modal").style.display = 'none'
let radioName = document.getElementById("radioName")
let radioElement = document.getElementById("radioElement")
const URL_API = "https://pokebuildapi.fr/api/v1/"

//LES API 

//Liste Pokemons 

let datasFetch;
let urlApiPokemon = URL_API + "pokemon/limit/25";
await getDataFetch();
async function getDataFetch () {
    let res = await fetch(urlApiPokemon);
    datasFetch = await res.json();
}

//Liste types 

let datasFetchTypes;
let urlApiTypes = URL_API + "types";
await getDataFetchTypes();
async function getDataFetchTypes () {
    let resTypes = await fetch(urlApiTypes);
    datasFetchTypes = await resTypes.json();
}

//Liste pokemons par types

let urlPokemonParType = URL_API + "pokemon/type/"
async function getDataFetchPokemonParType (type) {
    let res = await fetch(urlPokemonParType + type);
    res.json()
        .then(element =>{
            element = element.slice(0,3);
            document.getElementById("modal").style.display = 'flex';
            let nomPokemon = document.getElementById("nompokemon");
            nomPokemon.innerHTML = "Voici trois pokemons de type " + document.querySelector("select").value + "<br><br> 1." + element[0].name + "<br> 2." + element[1].name + "<br> 3." + element[2].name
        });
}

//ALGORITHME

console.log(document.querySelector('input[name="radio"]:checked'))

if (document.querySelector('input[id="radioName"]:checked')) {
    afficherListeNom()
} else if (document.querySelector('input[id="radioElement"]:checked')){
    afficherListeElements()
}
// }else{
//     document.querySelector("select").options.length = 0
// }

document.querySelector("button").addEventListener("click", function(){
    if (radioName.checked){
        afficherModalNom(selectedValue)
    }else{
        afficherModalElement(selectedValue)
    }
})

//FONCTIONS

function afficherListeNom (){
    document.querySelector("select").options.length = 0
datasFetch.forEach(unPokemon => {
    let option = document.createElement('option')
    option.textContent = unPokemon.name;
    option.value = unPokemon.name;
    document.querySelector("select").appendChild(option);
}
)}

function afficherListeElements (){
    document.querySelector("select").options.length = 0
    datasFetchTypes.forEach(unType => {
        let optionTypes = document.createElement('option')
        optionTypes.textContent = unType.name;
        optionTypes.value = unType.name;
        document.querySelector("select").appendChild(optionTypes);
    })
}


function afficherModalNom(selectedValue){}

function afficherModalElement (selectedValue){}