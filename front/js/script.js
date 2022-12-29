// on récupère les données de l'URL de l'API avec fetch
fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(function(data) { 
  showItems(data);
})
.catch(function(err) {
//Message d'erreur si le serveur ne répond pas
  alert(' Une erreur est survenue, Avez vous pensé à lancer le serveur local (Port 3000)?');
});
//Affichages des produits au bon endroit
function showItems(data) {
  for (product of data) {
//Création des éléments HTML manquants
    let productCard = document.createElement('a');
    productCard.href="./product.html?id="+`${product._id}`;
    let article = document.createElement('article');
    let image = document.createElement('img');
    image.src=`${product.imageUrl}`;
    let h3 = document.createElement('h3');
    h3.classList.add("productName");
    h3.innerHTML =`${product.name}`;
    let p = document.createElement('p');
    p.classList.add("productDescription");
    p.innerHTML = `${product.description}`;
//On insère les éléments crées dans le code HTML    
    const items = document.getElementById('items');
    items.append(productCard);
    productCard.append(article);
    article.append(image);
    article.append(h3);
    article.append(p);
    
  }
}

