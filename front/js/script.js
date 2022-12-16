fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(function(data) { 
    showItems(data);
  })
  .catch(function(err) {
    // Une erreur est survenue, Avez vous pensé à lancer le serveur local (Port 3000) ?
  });
  
  function showItems(data) {
    for (product of data) {
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

    const items = document.getElementById('items');
      items.append(productCard);
        productCard.append(article);
        article.append(image);
        article.append(h3);
        article.append(p);

    }
}
