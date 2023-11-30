// Importé les données de JSON
const pieces = await fetch("pieces-autos.json").then((pieces)=>pieces.json())

//Construire notre balise
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

//Rattachement de notre balise au DOM
const sectionFiches = document.querySelector(".fiches")
sectionFiches.appendChild(piecesElement)
piecesElement.appendChild(imagesElement)
piecesElement.appendChild(nomElement)
piecesElement.appendChild(prixElement)
piecesElement.appendChild(categorieElement)
piecesElement.appendChild(descriptionElement)
piecesElement.appendChild(stockElement)
}
const boutonTrier = document.querySelector(".btn-trier")
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees=pieces.toSorted((a,b)=>a.prix-b.prix)
     console.log(piecesOrdonnees);
 })


 const boutonFiltrer = document.querySelector(".btn-filtrer");
 boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter((piece)=>piece.prix <= 35)
    console.log(piecesFiltrees)
})


const boutonFiltrerDesc = document.querySelector(".btn-description")
boutonFiltrerDesc.addEventListener("click", ()=>{
    const piecesFDesc = pieces.filter((piece)=>piece.description)
    console.log(piecesFDesc)
})


const boutonDecroissant = document.querySelector(".btn-decroissant")
boutonDecroissant.addEventListener("click",()=>{
    const piecesDecroissant= pieces.toSorted((a,b)=>b.prix-a.prix)
    console.log(piecesDecroissant)
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
