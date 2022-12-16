let productLocalStorage = JSON.parse(localStorage.getItem("product"));

const cartElement = document.querySelector("#cart__items");

if (productLocalStorage == null){
    console.log("je suis vide");
}
else {
    let cartItems = [];
}

