const menuItems = {
    hamburgueres: [
        { name: "Smoke 'n' Crunch", description: "Bacon, Hambúrger de Frango, Pão de Hambúrger, Cheddar, Carne Porco e Molho Cocktail", price: 120, image: "https://png.pngtree.com/png-vector/20201224/ourmid/pngtree-ai-illustration-hamburger-hand-drawn-burger-png-png-image_2618511.jpg" },
        { name: "Golden Cruncher", description: "Cebola, Pepino, Hambúrguer de Frango, Alface, Cheddar e Pão de Hambúrguer", price: 110, image: "https://static.vecteezy.com/system/resources/previews/050/142/966/non_2x/cartoon-style-3d-chicken-burger-icon-isolated-on-transparent-background-cutout-png.png" },
        { name: "Green Reactortor", description: "Cebola, Pepino, Abacate, Molho Cokctail, Alface e Pão de Hambúrguer", price: 110, image: "https://png.pngtree.com/png-clipart/20241230/original/pngtree-3d-vegan-burger-with-avocado-on-transparent-background-png-image_18283109.png" },
        { name: "Double Boom", description: "Cebola, Pepino, Hambúrguer de  Frango, Alface, Cheddar, Pão de Hambúrguer", price: 90, image: "https://png.pngtree.com/png-clipart/20250514/original/pngtree-double-cheeseburger-with-lettuce-and-tomato-png-image_20958735.png" },
    ],
    sobremesas: [
        { name: "Waffle Baunilha", description: "Gelado de Morango, Leite, Ovos, Bolacha e Farinha", price: 70, image: "https://png.pngtree.com/png-clipart/20250108/original/pngtree-cartoon-waffle-dessert-png-file-png-image_12999345.png" },
        { name: "Cheesecake Morango", description: "Leite, Bolacha, Açucar e Morango", price: 60, image: "https://png.pngtree.com/png-clipart/20250207/original/pngtree-slice-of-cheesecake-with-red-strawberry-topping-isolated-on-transparent-background-png-image_20378669.png" },
        { name: "Gelado Cookies e Manga", description: "Gelado de Morango, Bolacha e Morango", price: 60, image: "https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-delicious-cookies-and-cream-recipes-to-try-at-home-png-image_13324400.png" },
    ],
    bebidas: [
        { name: "Cola", description: "Laranja, Gelo, Hortelã", price: 60, image: "https://img2.gratispng.com/20180504/yzq/avdmk95vp.webp" },
        { name: "Smoothie", description: "Morango, leite, Gelo, Açucar, Banana", price: 60, image: "https://png.pngtree.com/png-clipart/20231107/original/pngtree-strawberry-smoothie-isolated-breakfast-picture-image_13238464.png" },
        { name: "Sumo de Laranja", description: "Limão, Gelo, Grãos de Café, Açucar, Gasosa", price: 50, image: "https://static.vecteezy.com/system/resources/previews/024/849/168/non_2x/fresh-orange-juice-with-fruits-transparent-background-png.png    " },
    ],
    acompanhamentos: [
        { name: "Atomic Fries", description: "Batatas fritas especiais", price: 50, image: "https://png.pngtree.com/element_pic/00/16/08/0657a4e9b377d0d.png" },
        { name: "Up 'n' Nuggets", description: "Molho Cocktail, Asinhas de Frango", price: 50, image: "https://png.pngtree.com/png-clipart/20250515/original/pngtree-fried-chicken-nuggets-in-red-white-striped-box-isolated-vector-illustration-png-image_20984324.png" },
        { name: "Onion Rings", description: "Cebola, Molho Cocktail", price: 50, image: "https://imagensempng.com.br/wp-content/uploads/2021/08/05-29.png" },
    ],
    menus: [
        { name: "Smoke 'n' Brunch", description: "Waffle baunilha, Atomic fries, Cola", price: 180, image: "smoke_n_brunch.jpg" },
        { name: "Up n Ham", description: "Baguete com presunto", price: 160, image: "ham_baguete.jpg" },
        { name: "Golden Cruncher Combo", description: "Golden Cruncher, Cheesecake Morango, Atomic Fries, Cola", price: 150, image: "golden_cruncher_combo.jpg" },
    ],
};

const DELIVERY_FEE = 100.00;

function generateMenu() {
    const categories = ['hamburgueres', 'sobremesas', 'bebidas', 'acompanhamentos', 'menus'];
    categories.forEach(category => {
        const categoryDiv = document.getElementById(category);
        menuItems[category].forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("menu-item");
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Preço: $${item.price.toFixed(2)}</p>
                <div class="quantity-control">
                    <button class="decrement">-</button>
                    <input type="number" id="${category}-item-${index}" min="0" value="0" data-price="${item.price}">
                    <button class="increment">+</button>
                </div>
            `;
            categoryDiv.appendChild(itemDiv);
        });
    });
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

generateMenu();