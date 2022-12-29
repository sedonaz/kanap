//AFFICHAGE DU PRODUIT CHOISI
//On récupère les données de l'API du produit séléctionné
let params = (new URL(document.location)).searchParams;
let id = params.get ("id");
async function getProductById(){
  await fetch(`http://localhost:3000/api/products/${id}`,{
  method: "GET", 
  cache: "default",
})
.then (function(res){
  if (res.ok ){
    return res.json();
  }
})
.then(function(data){
  component = data;
})
};
//Affichage des détails du produit dans le code html
async function showProduct(){
  await getProductById();
  let divImage = document.querySelector("main article div.item__img");
  //On crée la balise img pour insérer l'image
  let image = document.createElement('img');
  //On récupère les données pour les mettre au bon endroit dans le code HTML
  image.src = `${component.imageUrl}`;
  document.getElementById('title').innerText=`${component.name}`;
  document.getElementById('price').innerText=`${component.price}`;
  document.getElementById('description').innerText= `${component.description}`;
  divImage.append(image);
}
//Fonction pour choisir la couleur
async function getColors(){
  await getProductById();
  let colors = component.colors;
  const select = document.querySelector("#colors");
  for ( let color in colors){
    const select = document.getElementById('colors');
    //On crée la balise option value pour le choix des couleurs
    let newColor = document.createElement('option');
    newColor.value = colors[color];
    newColor.innerHTML = colors[color];
    select.append(newColor);
    
  }
}
showProduct();
getColors();
//Variables pour la couleur, la quantité, le bouton et le panier
let productQuantity = document.getElementById("quantity");
let colorChoice = document.getElementById("colors");
let btn_addToCart = document.querySelector("#addToCart");
let productTable = JSON.parse(localStorage.getItem("cart"));
//Ajout du listener sur le bouton ajouter au panier
btn_addToCart.addEventListener("click", async function(e) {
  await getProductById();
  e.preventDefault();  
  //Variable contenant les options choisies 
  let productOption = {
    id : component._id,
    color : colorChoice.value,
    quantity : productQuantity.value,
    price : component.price,
    imageUrl : component.imageUrl,
    title : component.name,
  }
  if (colorChoice.value == 0 || productQuantity.value == 0){
    alert("la couleur ou la quantité n'est pas définie");
  }
  //LOCALSTORAGE
  //Si un produit est déja dans le panier avec la quantité et la couleur
  if (productTable){
    let productFound = productTable.find((p) => p.id === productOption.id && p.color === productOption.color);
    if(productFound){
      productFound.quantity = parseInt(productFound.quantity) + parseInt(productQuantity.value); 
    }
    else{
      productTable.push(productOption);
    }
    //Enregistrement du panier dans le localStorage
    localStorage.setItem("productTable", JSON.stringify(productTable));
  }
  //Si le panier est vide 
  else{
    productTable = [];
    productTable.push(productOption);
    localStorage.setItem("productTable", JSON.stringify(productTable));
    alert("le produit à été ajouté au panier");
  }
  
  
})







