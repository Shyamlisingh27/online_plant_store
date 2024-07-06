document.addEventListener('DOMContentLoaded', () => {
    const plantCategories = [
        {
            name: 'Air Purifying Plants',
            plants: [
                { name: 'Spider Plant', image: 'images/flow1.jpg' },
                { name: 'Snake Plant', image: 'images/snake_plant.jpg' }
                // Add more plants here
            ]
        },
        {
            name: 'Medicinal Plants',
            plants: [
                { name: 'Aloe Vera', image: 'images/aloe_vera.jpg' },
                { name: 'Tulsi', image: 'images/tulsi.jpg' }
                // Add more plants here
            ]
        },
        {
            name: 'Flowering Plants',
            plants: [
                { name: 'Rose', image: 'images/rose.jpg' },
                { name: 'Jasmine', image: 'images/jasmine.jpg' }
                // Add more plants here
            ]
        },
        {
            name: 'Outdoor Plants',
            plants: [
                { name: 'Palm', image: 'images/palm.jpg' },
                { name: 'Fern', image: 'images/fern.jpg' }
                // Add more plants here
            ]
        },
        {
            name: 'New Arrivals',
            plants: [
                { name: 'New Plant 1', image: 'images/new_plant1.jpg' },
                { name: 'New Plant 2', image: 'images/new_plant2.jpg' }
                // Add more plants here
            ]
        },
        {
            name: 'Gifting Plants',
            plants: [
                { name: 'Bonsai', image: 'images/bonsai.jpg' },
                { name: 'Orchid', image: 'images/orchid.jpg' }
                // Add more plants here
            ]
        },
        {
            name: 'Home Grown Plants',
            plants: [
                { name: 'Herb 1', image: 'images/herb1.jpg' },
                { name: 'Herb 2', image: 'images/herb2.jpg' }
                // Add more plants here
            ]
        }
    ];

    plantCategories.forEach(category => {
        const section = document.querySelector(`section.category h2:contains(${category.name})`).parentElement;
        const plantsGrid = section.querySelector('.plants-grid');

        category.plants.forEach(plant => {
            const plantDiv = document.createElement('div');
            plantDiv.className = 'plant';

            const plantImg = document.createElement('img');
            plantImg.src = plant.image;
            plantImg.alt = plant.name;

            const plantName = document.createElement('h3');
            plantName.textContent = plant.name;

            plantDiv.appendChild(plantImg);
            plantDiv.appendChild(plantName);
            plantsGrid.appendChild(plantDiv);
        });
    });
});

/*cart*/
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('remove')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('btnn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}



function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.querySelectorAll('h3')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc = shopItem.querySelectorAll('img')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="remove" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₹', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '₹' + total
}

