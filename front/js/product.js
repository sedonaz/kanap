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
 async function showProduct(){
  await getProductById();
  const divImage = document.querySelector("main article div.item__img");
  let image = document.createElement('img');
  image.src = `${component.imageUrl}`;
  document.getElementById('title').innerText=`${component.name}`;
  document.getElementById('price').innerText=`${component.price}`;
  document.getElementById('description').innerText= `${component.description}`;
  divImage.append(image);
 }
 async function getColors(){
  await getProductById();
  let colors = component.colors;
  const select = document.querySelector("#colors");
  for ( let color in colors){
    const select = document.getElementById('colors');

        let newColor = document.createElement('option');
        newColor.value = colors[color];
        newColor.innerHTML = colors[color];

        select.append(newColor);

  }
 }
 showProduct();
 getColors();

  const productQuantity = document.getElementById("quantity");
  const colorChoice = document.getElementById("colors");
  const btn_addToCart = document.querySelector("#addToCart");
  let productTable = JSON.parse(localStorage.getItem("productTable"));
  btn_addToCart.addEventListener("click", async function(e) {
    await getProductById();
    e.preventDefault();  
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
  if (productTable){
    productTable = productTable.filter(el => {
      return el.id !== productOption.id || el.color !== productOption.color;
    })
  }
  if (productTable){
    productTable.push(productOption);
    localStorage.setItem("productOption", JSON.stringify(productTable));
  }
  else{
    productTable = [];
    productTable.push(productOption);
    localStorage.setItem("productOption", JSON.stringify(productTable));
    alert("le produit à été ajouté au panier");
  }

  console.log(productTable);
  })



  
        
  

