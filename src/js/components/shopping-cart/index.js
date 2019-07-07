import './scss/index.scss';

import ShoppingCart from './js/shopping-cart';

const shoppingCart = [...document.querySelectorAll('[data-dc-component="shopping-cart"]')].map(n => new ShoppingCart(n));
