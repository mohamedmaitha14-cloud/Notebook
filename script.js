/* =====================================================
   MAITHA'S NOTEBOOK CAFÉ
   JAVASCRIPT
===================================================== */


/* =====================================================
   VARIABLES
===================================================== */

let cart = [];

let favorites = JSON.parse(
    localStorage.getItem("favorites")
) || [];


/* =====================================================
   GET HTML ELEMENTS
===================================================== */

const cartButton =
    document.getElementById("cartButton");

const favoriteButton =
    document.getElementById("favoriteButton");

const cartPopup =
    document.getElementById("cartPopup");

const favoritesPopup =
    document.getElementById("favoritesPopup");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");

const favoriteCount =
    document.getElementById("favoriteCount");

const favoriteItems =
    document.getElementById("favoriteItems");

const searchInput =
    document.getElementById("searchInput");

const categoryButtons =
    document.querySelectorAll(".category");

const productCards =
    document.querySelectorAll(".product-card");


/* =====================================================
   CART
===================================================== */

function addToCart(name, price) {

    const product = {
        name: name,
        price: price
    };

    cart.push(product);

    updateCart();

    alert(name + " was added to your cart! 💗");
}


function updateCart() {

    cartCount.textContent = cart.length;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty 💗
            </p>
        `;

        cartTotal.textContent = "AED 0";

        return;
    }


    let total = 0;


    cart.forEach(function (product, index) {

        total += product.price;


        const item = document.createElement("div");

        item.classList.add("cart-item");


        item.innerHTML = `

            <div>
                <h4>${product.name}</h4>
                <p>AED ${product.price}</p>
            </div>

            <button
                class="remove-cart"
                onclick="removeFromCart(${index})">
                Remove
            </button>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        "AED " + total;
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* =====================================================
   OPEN CART
===================================================== */

cartButton.addEventListener("click", function () {

    cartPopup.classList.add("show");

});


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    cartPopup.classList.remove("show");

}


/* =====================================================
   FAVORITES
===================================================== */

function toggleFavorite(button, productName) {

    const alreadyFavorite =
        favorites.includes(productName);


    if (alreadyFavorite) {

        favorites =
            favorites.filter(function (item) {

                return item !== productName;

            });

        button.classList.remove("liked");

        button.textContent = "♡";

    } else {

        favorites.push(productName);

        button.classList.add("liked");

        button.textContent = "♥";
    }


    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


    updateFavoriteCount();

    updateFavoritePopup();
}


function updateFavoriteCount() {

    favoriteCount.textContent =
        favorites.length;
}


/* =====================================================
   FAVORITES POPUP
===================================================== */

favoriteButton.addEventListener("click", function () {

    updateFavoritePopup();

    favoritesPopup.classList.add("show");

});


function updateFavoritePopup() {

    favoriteItems.innerHTML = "";


    if (favorites.length === 0) {

        favoriteItems.innerHTML = `

            <p class="empty-cart">
                You haven't saved any notebooks yet 💗
            </p>

        `;

        return;
    }


    favorites.forEach(function (favorite, index) {

        const item =
            document.createElement("div");

        item.classList.add("favorite-item");


        item.innerHTML = `

            <strong>${favorite}</strong>

            <button
                class="remove-favorite"
                onclick="removeFavorite(${index})">
                Remove
            </button>

        `;


        favoriteItems.appendChild(item);

    });
}


function removeFavorite(index) {

    favorites.splice(index, 1);


    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


    updateFavoriteCount();

    updateFavoritePopup();


    const buttons =
        document.querySelectorAll(".favorite-btn");


    buttons.forEach(function (button) {

        const card =
            button.closest(".product-card");

        const name =
            card.getAttribute("data-name");


        if (!favorites.includes(name)) {

            button.classList.remove("liked");

            button.textContent = "♡";
        }

    });
}


function closeFavorites() {

    favoritesPopup.classList.remove("show");

}


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    function () {

        const searchText =
            searchInput.value.toLowerCase();


        productCards.forEach(
            function (card) {

                const productName =
                    card
                    .getAttribute("data-name")
                    .toLowerCase();


                if (
                    productName.includes(searchText)
                ) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            }
        );

    }
);


/* =====================================================
   CATEGORY FILTER
===================================================== */

categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                categoryButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add("active");


                const category =
                    button.getAttribute(
                        "data-category"
                    );


                productCards.forEach(
                    function (card) {

                        const productCategory =
                            card.getAttribute(
                                "data-category"
                            );


                        if (
                            category === "all" ||
                            productCategory === category
                        ) {

                            card.style.display =
                                "block";

                        } else {

                            card.style.display =
                                "none";
                        }

                    }
                );

            }
        );

    }
);


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;


        alert(
            "Thank you, " +
            name +
            "! 💌 Your message has been received."
        );


        contactForm.reset();

    }
);


/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Add a notebook first! 📖"
        );

        return;
    }


    alert(
        "Thank you for shopping at Maitha's Notebook Café! 💗"
    );

    cart = [];

    updateCart();

    closeCart();
}


/* =====================================================
   CLOSE POPUPS WHEN CLICKING OUTSIDE
===================================================== */

window.addEventListener(
    "click",
    function (event) {

        if (event.target === cartPopup) {

            closeCart();

        }


        if (event.target === favoritesPopup) {

            closeFavorites();

        }

    }
);


/* =====================================================
   LOAD SAVED FAVORITES
===================================================== */

function loadFavorites() {

    const buttons =
        document.querySelectorAll(".favorite-btn");


    buttons.forEach(function (button) {

        const card =
            button.closest(".product-card");


        const productName =
            card.getAttribute("data-name");


        if (
            favorites.includes(productName)
        ) {

            button.classList.add("liked");

            button.textContent = "♥";

        }

    });


    updateFavoriteCount();

    updateFavoritePopup();
}


loadFavorites();