//Fonction pour récupérer le panier
function getCart(){
    let cart = localStorage.getItem("productTable");
    if(cart == null){
        return [];
    }
    else{
        return JSON.parse(cart);
    }
} 
//Fonction pour sauvegarder le panier
function saveCart(cart){
    localStorage.setItem("productTable", JSON.stringify(cart));
}
//Fonction pour supprimer un produit
function deleteProduct(product) {
    let cart = getCart();
    cart = cart.filter((p) => p.id !== product.id || p.color !== product.color);
    window.location.reload();
    saveCart(cart);    
}
//Fonction pour modifier la quantité de chaque produit
function modifyQuantity(product, quantity) {
    let itemQuantity = document.querySelectorAll('.itemQuantity');
    for (let j = 0; j < itemQuantity.length; j++) {
        let itemNewQuantity = itemQuantity[j].value;
        const newLocalStorage = {
            id: cart[j].id,
            image: cart[j].image,
            alt: cart[j].alt,
            name: cart[j].name,
            color: cart[j].color,
            price: cart[j].price,   
            quantity: itemNewQuantity,
        };
        cart[j] = newLocalStorage;
        window.location.reload();
        saveCart(cart);    
    }
}
let productTable = JSON.parse(localStorage.getItem("productTable"));
//Fonction pour afficher le nombre d'article
function totalArticles() {
    let totalItems = 0;
    for (let l in productTable) {
        let newQuantity = parseInt(productTable[l].quantity, 10);
        totalItems += newQuantity;
    }
    let totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalItems;
}
totalArticles();
//Fonction pour afficher le prix total
function totalPrice(){
    let calculPrice = [];
    for (let m = 0; m < productTable.length; m++) {
        let cartTotal = productTable[m].price * productTable[m].quantity;
        calculPrice.push(cartTotal
            );
            let reduce = (previousValue, currentValue) => previousValue + currentValue;
            total = calculPrice.reduce(reduce);
        }
        const totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent = total;
    }
    totalPrice();
    
    
    
