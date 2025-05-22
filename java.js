document.querySelectorAll('#add-to-basket').forEach(button => {
    button.addEventListener('click', function() {
        
        const itemBox = this.closest('.item-box');

        
        const itemBrand = itemBox.getAttribute('data-brand-name');
        const itemName = itemBox.getAttribute('data-item-name');
        const itemPrice = parseFloat(itemBox.getAttribute('data-item-price').replace('£', '').replace(' GBP', ''));
        const itemSize = itemBox.querySelector('#size-select').value; // Get the selected size

        const item = {
            brand: itemBrand,
            name: itemName,
            price: itemPrice,
            size: itemSize
        };

        // Get the current basket from local storage or initialize it
        let basket = JSON.parse(localStorage.getItem('basket')) || [];

        // Add the item to the basket
        basket.push(item);

        // Save the updated basket back to local storage
        localStorage.setItem('basket', JSON.stringify(basket));

        

        // Change button text to "PROCEED TO CHECKOUT"
        const addToBasketButton = this;
        addToBasketButton.innerText = 'PROCEED TO CHECKOUT';
        addToBasketButton.onclick = function() {
            window.location.href = 'basket.html'; // Redirect to the basket page
        };
    });
});


function renderBasket() {
    const basketItemsContainer = document.getElementById('basket-items');
    const basketQuantity = document.getElementById('basket-quantity');
    const basketSubtotal = document.getElementById('basket-subtotal');
    const basketTotal = document.getElementById('basket-total');
    let basket = JSON.parse(localStorage.getItem('basket')) || [];

    let totalQuantity = 0;
    let subtotal = 0;

    
    basketItemsContainer.innerHTML = '';

    if (basket.length === 0) {
        basketItemsContainer.innerHTML = '<p>Your basket is empty.</p>';
        basketQuantity.innerText = 'Total Items: 0';
        basketSubtotal.innerText = 'Subtotal: £0.00';
        basketTotal.innerText = 'Total: £0.00';
    } else {
        basket.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('basket-item');
            itemElement.innerHTML = `
                <h2>${item.name}</h2>
                <p>Price: £${item.price.toFixed(2)}</p>
                <p>Size: ${item.size}</p>
            `;
            basketItemsContainer.appendChild(itemElement);

            
            totalQuantity += 1;
            subtotal += item.price;
        });

        // Update the summary
        basketQuantity.innerText = `Total Items: ${totalQuantity}`;
        basketSubtotal.innerText = `Subtotal: £${subtotal.toFixed(2)}`;
        basketTotal.innerText = `Total: £${subtotal.toFixed(2)}`;
    }
}

// Render the basket when the page loads
document.addEventListener('DOMContentLoaded', renderBasket);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const users = {
    'clear@gmail.com': 'clear123'
};




app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists and the password is correct
    if (users[username] && users[username] === password) {
        res.send('Login successful');
    } else {
        res.send('Invalid username or password.');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
