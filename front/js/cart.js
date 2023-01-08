/*---------------------------------------RÉCUPÉRATION DU PANIER---------------------------------------------------------------------*/

let section = document.getElementById("cart__items");
let totalQuantity = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');
let totalCartPrice = 0;
for (let product of cart){
    let productQuantity = product.quantity;
    fetch(`http://localhost:3000/api/products/${product.id}`)
    .then ((response) => response.json())
    .then ((productDetails) =>{
        /*----------------------------------------CRÉATION DU BLOC ARTICLE-------------------------------------------------------------------*/
        let article = document.createElement('article');
        article.classList.add("cart__item");  
        article.setAttribute("data-id", product.id );
        article.setAttribute("data_color", product.color);
        section.appendChild(article);
        //div contenant l'image
        let divImg = document.createElement("div");
        divImg.classList.add("cart__item__img");
        article.appendChild(divImg);
        let image = document.createElement('img');
        image.src =`${productDetails.imageUrl}`;
        image.alt = `${productDetails.altTxt}`;
        divImg.appendChild(image);
        //div contenant les détails du produit
        let divCartItem = document.createElement("div");
        divCartItem.classList.add("cart__item__content");
        article.append(divCartItem);
        //div contenant la description du produit
        let divCartDescription = document.createElement("div");
        divCartDescription.classList.add("cart__item__content__description");
        divCartItem.appendChild(divCartDescription);
        //le nom du produit
        let h2 = document.createElement("h2");
        h2.textContent = productDetails.name;
        divCartDescription.appendChild(h2);
        //la couleur du produit
        let p = document.createElement("p");
        p.textContent = product.color;
        divCartDescription.appendChild(p);
        //le prix du produit
        let p2 = document.createElement("p");
        p2.textContent = productDetails.price + "€";
        divCartDescription.appendChild(p2); 
        //paramètre du produit
        let divCartSettings = document.createElement("div");
        divCartSettings.classList.add("cart__item__content__settings");
        divCartItem.appendChild(divCartSettings);
        //quantité du produit
        let divCartQuantity = document.createElement("div");
        divCartQuantity.classList.add("cart__item__content__settings__quantity");
        divCartSettings.appendChild(divCartQuantity);
        let p3 = document.createElement("p");
        p3.textContent = "Qté : ";
        divCartQuantity.appendChild(p3);
        let input = document.createElement("input");
        input.classList.add("itemQuantity");
        input.setAttribute("type", "number");
        input.setAttribute("name", "itemQuantity");
        input.setAttribute("min", 1);
        input.setAttribute("max", 100);
        input.setAttribute("value", productQuantity);
        divCartQuantity.appendChild(input);
        //Bouton supprimer le produit
        let divCartDelete = document.createElement("div");
        divCartDelete.classList.add("cart__item__content__settings__delete");
        divCartSettings.appendChild(divCartDelete);
        let p4 = document.createElement("p");
        p4.classList.add("deleteItem");
        p4.textContent = "supprimer";
        divCartDelete.appendChild(p4); 
        //Nombre total des produits du panier 
        totalQuantity.textContent = totalArticles();
        //Prix total du panier
        totalPrice.textContent = getTotalPrice(productDetails,productQuantity);
        
        // ajout du listener pour exécuter l'action deleteProduct
        p4.addEventListener("click", function(){
            deleteProduct(product);
            alert("l'article à été supprimé du panier");
            document.location.reload();
        });
        // ajout listener changement quantité 
        let oldQuantity = Number(input.value);
        input.addEventListener("change", function(){
            productQuantity = modifyQuantity(product, Number(input.value));
            totalPrice.textContent = modifyTotalPrice(productDetails,oldQuantity,Number(input.value));
            oldQuantity = Number(input.value);
            totalQuantity.textContent = totalArticles();
        });    
    })  
}
let form = document.querySelector(".cart__order__form");
// REGEX
let adressRegExp = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");
let nameRegExp = new RegExp("^[A-zÀ-ú \-]+$");
let emailRegExp = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");
let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
form.firstName.addEventListener('change', function(e) {
    let value = e.target.value;
    if (nameRegExp.test(value)){
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre prénom.';
    }
});
let lastNameErrorMsg = form.lastName.nextElementSibling;
form.lastName.addEventListener('change', function(e) {
    let value = e.target.value;
    if (nameRegExp.test(value)){
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre nom.';
    }
});
let adressErrorMsg = document.querySelector('#addressErrorMsg');
form.address.addEventListener('change', function(e) {
    let value = e.target.value;
    if (adressRegExp.test(value)){
        adressErrorMsg.innerHTML = '';
    } else {
        adressErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre adresse postale.';
    }
});
let cityErrorMsg = document.querySelector('#cityErrorMsg');
form.city.addEventListener('change', function(e) {
    let value = e.target.value;
    if (nameRegExp.test(value)){
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre ville.';
    }
});
let emailErrorMsg = document.querySelector('#emailErrorMsg');
form.email.addEventListener('change', function(e) {
    let value = e.target.value;
    if (emailRegExp.test(value)){
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre adresse email.';
    }
});
// Passer commande
let btnOrder = document.querySelector('#order');
btnOrder.addEventListener('click', function(e) {
    e.preventDefault();
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');
    if(cart.length < 1){
        alert('Veuillez mettre un produit dans le panier');
        e.preventDefault();    
    } else if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
        alert("Vous devez renseigner vos coordonnées pour passer la commande !");
        e.preventDefault();
    } else if (nameRegExp.test(inputFirstName.value) ==  false || nameRegExp.test(inputLastName.value) ==  false || adressRegExp.test(inputAddress.value) ==  false || nameRegExp.test(inputCity.value) ==  false || emailRegExp.test(inputEmail.value) ==  false) {
        alert("Vérifiez vos coordonnées pour passer la commande !");
        e.preventDefault();
    } else {
        let products = [];
        for (let product of cart) {
            products.push(product.id);
        }
        let contact = {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            email: inputEmail.value,
        }
        let formData = {
            contact,
            products,
        }
        let options = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 
                'Content-Type': 'application/json',
            }
        };
        //On envoie les données à l'API
        fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('orderId', data.orderId);
            document.location.href = 'confirmation.html?id='+ data.orderId;
        });    
    }
});




/*
//Fonction pour le remplissage du formulaire
function form() {
    let orderForm = document.querySelector(".cart__order__form");
    //Contrôle des données de l'utilisateur grâce à regex
    
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    //Ajout des listerners   
    orderForm.firstName.addEventListener('change', function() {
        validFirstName(this);
    });
    orderForm.lastName.addEventListener('change', function() {
        validLastName(this);
    });
    orderForm.address.addEventListener('change', function() {
        validAddress(this);
    });
    orderForm.city.addEventListener('change', function() {
        validCity(this);
    });
    orderForm.email.addEventListener('change', function() {
        validEmail(this);
    });
    
    let validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
        
        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    
    let validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;
        
        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    let validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;
        
        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    
    let validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;
        
        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    
    let validEmail = function(inputEmail) {
        let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
        let test = emailRegExp.test(inputEmail.value);
        
        let emailErrorMsg = inputEmail.nextElementSibling;
        
        if (test === true) {
            emailErrorMsg.innerHTML = 'Champ valide';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner une adresse email valide.';
        }
    };
}
form();
//Fonction pour l'envoi du formulaire au back-end
function postForm() {
    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
        event.preventDefault();
        const contact = {
            firstName : document.getElementById('firstName').value,
            lastName : document.getElementById('lastName').value,
            address : document.getElementById('address').value,
            city : document.getElementById('city').value,
            email : document.getElementById('email').value
        }
        if(cart.length < 1){
            alert('Veuillez mettre un produit dans le panier')
            event.preventDefault();
        }
        
        let products = [];
        for (let product of cart) {
            products.push(product.id);
        }
        let formData = {
            contact,
            products,
        }
        let options = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 
                'Content-Type': 'application/json',
            }
        };
        //On envoie les données à l'API
        fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('orderId', data.orderId);
            document.location.href = 'confirmation.html?id='+ data.orderId;
        });
        
    }); 
}
postForm();
*/




