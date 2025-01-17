import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis, supprimerAvis, afficherGraphiqueAvis } from "./avis.js";

// Récupération des pièces éventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem("pieces");

if(pieces===null){
// Importé les données de JSON
const pieces = await fetch("http://localhost:8081/pieces").then((pieces)=>pieces.json())
 // Transformation des pièces en JSON
 const valeurPieces = JSON.stringify(pieces);
 // Stockage des informations dans le localStorage
 window.localStorage.setItem("pieces", valeurPieces);
}else{
    pieces = JSON.parse(pieces);
}
//appeler la function d'ajout d'avis
ajoutListenerEnvoyerAvis()

//Construire notre balise
function genererPieces(pieces){
    for(let i=0;i<pieces.length;i++){
const article = pieces[i]
const piecesElement=document.createElement("article")
const imagesElement = document.createElement("img")
imagesElement.src = article.image
const nomElement = document.createElement("h2")
nomElement.innerText = article.nom
const prixElement = document.createElement("p")
prixElement.innerText = `Prix : ${article.prix}€ (${article.prix<35 ? "€" : "€€€"})`
const categorieElement = document.createElement("p")
categorieElement.innerText = article.categorie ??"(aucune categorie)"
const descriptionElement = document.createElement("p")
descriptionElement.innerText= article.description ?? "(Pas de description pour le moment.)"
const stockElement = document.createElement("p")
stockElement.innerText = `${article.disponibilite ? "En Stock" : "Rupture de stock"}`
// ajouter boutton avis
const avisBouton = document.createElement("button");
avisBouton.dataset.id = article.id;
avisBouton.textContent = "Afficher les avis";

//Rattachement de notre balise au DOM

const sectionFiches = document.querySelector(".fiches")
sectionFiches.appendChild(piecesElement)
piecesElement.appendChild(imagesElement)
piecesElement.appendChild(nomElement)
piecesElement.appendChild(prixElement)
piecesElement.appendChild(categorieElement)
piecesElement.appendChild(descriptionElement)
piecesElement.appendChild(stockElement)
piecesElement.appendChild(avisBouton)
}
// Ajout de la fonction ajoutListenersAvis
ajoutListenersAvis();
}

genererPieces(pieces)

//pour lessez les avis afficher
for(let i = 0; i < pieces.length; i++){
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`)
    const avis = JSON.parse(avisJSON);

    if(avis !== null){
        const pieceElement = document.querySelector(`article[data-id="${id}"]`);
        if(pieceElement!==null)afficherAvis(pieceElement, avis)
    }
}

const boutonTrier = document.querySelector(".btn-trier")
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees=pieces.toSorted((a,b)=>a.prix-b.prix)
     console.log(piecesOrdonnees);
     document.querySelector(".fiches").innerHTML=""
     genererPieces(piecesOrdonnees)
     
 })


 const boutonFiltrer = document.querySelector(".btn-filtrer");
 boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter((piece)=>piece.prix <= 35)
    console.log(piecesFiltrees)
     document.querySelector(".fiches").innerHTML=""
     genererPieces(piecesFiltrees)
})


const boutonFiltrerDesc = document.querySelector(".btn-description")
boutonFiltrerDesc.addEventListener("click", ()=>{
    const piecesFDesc = pieces.filter((piece)=>piece.description)
    console.log(piecesFDesc)
     document.querySelector(".fiches").innerHTML=""
     genererPieces(piecesFDesc)
})


const boutonDecroissant = document.querySelector(".btn-decroissant")
boutonDecroissant.addEventListener("click",()=>{
    const piecesDecroissant= pieces.toSorted((a,b)=>b.prix-a.prix)
    console.log(piecesDecroissant)
     document.querySelector(".fiches").innerHTML=""
     genererPieces(piecesDecroissant)

})


//focaliser sur les nom avec la fonction map 
const noms=pieces.map(piece=>piece.nom)


// suprimez les piece aabordable avec la fonction splice
for(let i=pieces.length-1;i>=0;i--){
    if(pieces[i].prix>35){
      noms.splice(i,1)
    }}

//afficher le resultat
const listUl=document.createElement("ul")
for(let e=0;e<noms.length;e++){
    const listli=document.createElement("li")
    listli.innerText=noms[e]
    listUl.appendChild(listli)
}

// integrer les balises crée 
const abordable=document.querySelector(".abordables")
abordable.appendChild(listUl)
//focalizer sur le nom et le prix
const prixTab=pieces.map(piece=>piece.prix)
const nomTab=pieces.map(piece=>piece.nom)

for(let i=pieces.length-1;i>=0;i--){
    if(pieces[i].disponibilite===false){
      prixTab.splice(i,1)
      nomTab.splice(i,1)
    }}

//affichez le resultat
const disponibleUl=document.createElement("ul")
for(let i=0;i<prixTab.length;i++){
    const disponibleli=document.createElement("li")
    disponibleli.innerText=nomTab[i]+"-"+prixTab[i]+"€"
    disponibleUl.appendChild(disponibleli)
}

//integer les balises
const disponible=document.querySelector(".disponible")
disponible.appendChild(disponibleUl)


//range
const inputPrixMax = document.getElementById("prix-max")
inputPrixMax.addEventListener("input",()=>{
    const piecesFilterRange=pieces.filter(function (piece){
        return piece.prix <= inputPrixMax.value
    })
    document.querySelector(".fiches").innerHTML=""
    genererPieces(piecesFilterRange)
})

// Ajout du listener pour mettre à jour des données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function () {
  window.localStorage.removeItem("pieces");
});
supprimerAvis()
await afficherGraphiqueAvis()