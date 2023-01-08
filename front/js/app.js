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
let cart = getCart();
//Fonction pour modifier la quantité de chaque produit
function modifyQuantity(product, quantity) {
    let productFound = cart.find((p) => p.id === product.id && p.color === product.color);
    if (productFound != undefined){
        if(quantity <= 0){
            deleteProduct(product);
        }
        else if(quantity>100){
            alert("la quantité est limitée à 100 articles");
        }
        else{
            productFound.quantity = quantity;
            saveCart(cart);
        }
    }
    else{
        cart.push(product);
    }
}
//Fonction pour afficher le nombre d'article
function totalArticles() {
    let totalItems = 0;
    for (let l of cart) {
        totalItems += parseInt(l.quantity);
    }
    return totalItems;
}
//Fonction pour modifier le prix total
function modifyTotalPrice(product,oldQuantity,newQuantity){
    if (newQuantity > oldQuantity){
        totalCartPrice += product.price *(newQuantity-oldQuantity);
    }
    else if(newQuantity < oldQuantity){
        totalCartPrice += product.price *(newQuantity-oldQuantity);
    }
    return totalCartPrice; 
}

//Fonction pour afficher le prix total
function getTotalPrice(product, quantity){
    totalCartPrice += product.price * quantity;
    return totalCartPrice;
}
//Fonction pour ajouter au panier
function addToCart(product){
    let productFound = cart.find((p) => p.id === product.id && p.color === product.color);
    if (productFound != undefined){
        productFound.quantity = Number(productFound.quantity) + Number(product.quantity);
    }
    else{
        cart.push(product);
    }
    saveCart(cart);
} 


