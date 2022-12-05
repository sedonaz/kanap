fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => { 
    showItems(data);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

  //---------J'AFFICHE TOUS LES PRODUITS---------


  function showItems(data) {
    for (product of data) {
        const productCard = document.getElementById('items');
        productCard.innerHTML +=`
        <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
        </a>
      `; 
    }
}
