const menuItems = {
    hamburger: [
        { name: "Smoke 'n' Crunch", description: "Bacon, Hambúrguer de Frango, Pão de Hambúrguer, Cheddar, Carne de Porco, Molho Cocktail", price: 120, image: "https://images.vexels.com/media/users/3/152411/isolated/preview/4a22d435331dde73ae0f1cebbdbaacff-icone-de-hamburguer-duplo.png" },
        { name: "Golden Cruncher", description: "Cebola, Pepino, Hambúrguer de Frango, Alface, Cheddar, Pão de Hambúrguer", price: 110, image: "https://static.vecteezy.com/system/resources/previews/050/142/966/non_2x/cartoon-style-3d-chicken-burger-icon-isolated-on-transparent-background-cutout-png.png" },
        { name: "Green Reactortor", description: "Cebola, Pepino, Abacate, Molho Cocktail, Alface, Pão de Hambúrguer", price: 110, image: "https://png.pngtree.com/png-clipart/20241230/original/pngtree-3d-vegan-burger-with-avocado-on-transparent-background-png-image_18283109.png" },
        { name: "Double Boom", description: "Cebola, Pepino, Hambúrguer de Frango, Alface, Cheddar, Pão de Hambúrguer", price: 90, image: "https://static.vecteezy.com/system/resources/previews/027/145/340/non_2x/delicious-double-size-burger-isolated-on-transparent-background-png.png" },
    ],
    sobremesas: [
        { name: "Waffle Baunilha", description: "Gelado de Morango, Leite, Ovos, Bolacha, Farinha", price: 70, image: "https://png.pngtree.com/png-clipart/20250108/original/pngtree-cartoon-waffle-dessert-png-file-png-image_12999345.png" },
        { name: "Cheesecake Morango", description: "Leite, Bolacha, Açúcar, Morango", price: 60, image: "https://png.pngtree.com/png-clipart/20250207/original/pngtree-slice-of-cheesecake-with-red-strawberry-topping-isolated-on-transparent-background-png-image_20378669.png" },
        { name: "Gelado Cookies e Manga", description: "Gelado de Morango, Bolacha, Morango", price: 60, image: "https://www.pngarts.com/files/1/Wafer-Ice-Cream-Transparent-Image.png" },
    ],
    bebidas: [
        { name: "Cola", description: "Café, Gelo, Gasosa, Limão, Açúcar", price: 60, image: "https://images.seeklogo.com/logo-png/27/2/coca-cola-logo-png_seeklogo-276333.png" },
        { name: "Café", description: "Café", price: 40, image: "https://static.vecteezy.com/system/resources/thumbnails/023/742/327/small_2x/latte-coffee-isolated-illustration-ai-generative-free-png.png" },
        { name: "Smoothie", description: "Morango, Leite, Gelo, Açúcar, Banana", price: 60, image: "https://png.pngtree.com/png-clipart/20231107/original/pngtree-strawberry-smoothie-isolated-breakfast-picture-image_13238464.png" },
        { name: "Sumo de Laranja", description: "Laranja, Gelo, Hortelã", price: 50, image: "https://static.vecteezy.com/system/resources/previews/024/849/168/non_2x/fresh-orange-juice-with-fruits-transparent-background-png.png" },
    ],
    adicional: [
        { name: "Atomic Fries", description: "Batata, Sal", price: 50, image: "https://png.pngtree.com/element_pic/00/16/08/0657a4e9b377d0d.png" }, 
        { name: "Up 'n' Nuggets", description: "Molho Cocktail, Asinha de Frango", price: 50, image: "https://static.vecteezy.com/system/resources/thumbnails/027/308/916/small_2x/chicken-nugget-with-ai-generated-free-png.png" },
        { name: "Onion Rings", description: "Cebola, Farinha, Óleo", price: 50, image: "https://imagensempng.com.br/wp-content/uploads/2021/08/05-29.png" },
    ],
    menus: [
        { name: "Smoke 'n' Brunch", description: "Inclui Waffle Baunilha, Atomic Fries, Cola", price: 180, image: "https://i.ibb.co/vCpfj8xY/1.png" },
        { name: "Up n Ham", description: "Baguete, Presunto", price: 160, image: "https://i.ibb.co/tp5KcTww/2.png" },
        { name: "Golden Cruncher Combo", description: "Inclui Golden Cruncher, Cheesecake Morango, Atomic Fries, Cola", price: 150, image: "https://i.ibb.co/rRB6sz3j/3.png" },
    ],
};

const DELIVERY_FEE = 100.00;

function generateMenu() {
    const menuContainer = document.getElementById('menu');
    let itemIndex = 0;
    for (const category in menuItems) {
        menuItems[category].forEach((item) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("menu-item");
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p class="description">${item.description}</p>
                <p class="price">Preço: $${item.price.toFixed(2)}</p>
                <div class="quantity-control">
                    <button class="decrement">-</button>
                    <input type="number" id="${category}-item-${itemIndex}" min="0" value="0" data-price="${item.price}" data-description="${item.description}">
                    <button class="increment">+</button>
                </div>
            `;
            menuContainer.appendChild(itemDiv);
            itemIndex++;
        });
    }
}

function updateIngredients() {
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';

    const ingredientCount = {};
    document.querySelectorAll('.menu-item').forEach(item => {
        const input = item.querySelector('input[type="number"]');
        const quantity = parseInt(input.value);
        if (quantity > 0) {
            const description = input.getAttribute('data-description');
            let ingredients = [];
            // Verifica se é um menu (contém "Inclui")
            if (description.includes("Inclui")) {
                const includedItems = description.split("Inclui")[1].split(",").map(item => item.trim());
                includedItems.forEach(included => {
                    const menuItem = Object.values(menuItems).flat().find(i => i.name.toLowerCase() === included.toLowerCase());
                    if (menuItem) {
                        ingredients = ingredients.concat(menuItem.description.split(/\s*,\s*/).map(ing => ing.trim()));
                    }
                });
            } else {
                ingredients = description.split(/\s*,\s*/).map(ing => ing.trim());
            }
            ingredients.forEach(ingredient => {
                if (ingredient) {
                    ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + quantity;
                }
            });
        }
    });

    for (const ingredient in ingredientCount) {
        const p = document.createElement('p');
        p.textContent = `${ingredient} x${ingredientCount[ingredient]}`;
        ingredientsList.appendChild(p);
    }
}

function updateTotal() {
    let subtotal = 0;
    document.querySelectorAll('.menu-item').forEach(item => {
        const input = item.querySelector('input[type="number"]');
        const quantity = parseInt(input.value);
        const price = parseFloat(input.getAttribute('data-price'));
        if (quantity > 0) {
            subtotal += quantity * price;
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
    document.getElementById('subtotal-amount').textContent = `$${subtotal.toFixed(2)}`;

    const deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
    let deliveryFee = 0;
    if (deliveryOption === 'home') {
        deliveryFee = DELIVERY_FEE;
    }
    document.getElementById('delivery-fee').textContent = `$${deliveryFee.toFixed(2)}`;

    const total = subtotal + deliveryFee;
    document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
    document.getElementById('sidebar-total').textContent = `$${total.toFixed(2)}`;

    updateIngredients();
}

function resetOrder() {
    document.querySelectorAll('.menu-item input[type="number"]').forEach(input => {
        input.value = 0;
    });
    document.querySelector('input[name="delivery"][value="pickup"]').checked = true;
    updateTotal();
}

// Event listeners for quantity controls
document.getElementById('menu').addEventListener('click', function(event) {
    if (event.target.classList.contains('increment')) {
        const input = event.target.previousElementSibling;
        input.value = parseInt(input.value) + 1;
        updateTotal();
    } else if (event.target.classList.contains('decrement')) {
        const input = event.target.nextElementSibling;
        if (input.value > 0) {
            input.value = parseInt(input.value) - 1;
            updateTotal();
        }
    }
});

// Event listener for direct input changes
document.getElementById('menu').addEventListener('input', function(event) {
    if (event.target.type === 'number') {
        updateTotal();
    }
});

// Event listener for delivery option changes
document.getElementById('delivery').addEventListener('change', updateTotal);

// Event listener for reset button
document.getElementById('reset-button').addEventListener('click', resetOrder);

generateMenu();
