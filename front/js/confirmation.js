//On récupère le numéros de commande depuis l'URL
let id = new URL(window.location.href).searchParams.get("id");
//On sélectionne l'élément HTML où s'affichera le numéro de commande 
let orderId = document.querySelector('#orderId');
//On insère le numéro de commande dans le code html
orderId.innerHTML = id;
alert('Votre commande a été validée ! Merci pour votre achat')
//On néttoie le localStorage
localStorage.clear();



