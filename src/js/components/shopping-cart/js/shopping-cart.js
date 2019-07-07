import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import { getProducTemplate, getCartTemplate, getTitle } from './templates';
import { createObject } from './helpers';
import { data } from './data';

export default class ShoppingCart {
    constructor(element) {
        this.element = element;
        this.newData = cloneDeep(data);
        this.cartData = [];
        this.quantity = this.element.querySelector('[data-dc-shopping-cart-ref="quantity"]');
        this.goodsContainer = this.element.querySelector('[data-dc-shopping-cart-ref="goods-container"]');
        this.cartTitle = this.element.querySelector('[data-dc-shopping-cart-ref="cart-title"]');
        this.cartElement = this.element.querySelector('[data-dc-shopping-cart-ref="cart"]');

        this.init();
    }

    init() {
        this.element.addEventListener('click', this.shoppingCartStrategy);

        this.renderCartTitle();
        this.render();
    }

    renderCartTitle = () => {
        const countList = this.cartData.map((item) => item.count);
        const count = countList.reduce((sum, current) => sum + current , 0);
        const totalPrice = this.cartData.reduce((acc, n) => acc + n.count * n.price, 0);

        if (this.cartData.length === 0) {
            this.cartTitle.innerHTML = `
                <div>Корзина пуста</div>
            `;
        } else {
            this.cartTitle.innerHTML = `
                <div>В корзине <b>${count}</b> ${getTitle(count, 'товар')} на сумму <b>${totalPrice}</b> рублей</div>
            `;
        }
    }

    getQuantityOfGoods = () => {
        const quantity = this.newData.length;
        this.quantity.innerHTML = quantity;
    }

    render = () => {
        this.goodsContainer.innerHTML = '';
        this.getQuantityOfGoods();
        this.newData.forEach(item => this.goodsContainer.innerHTML += getProducTemplate(item));
    }

    addToCart = (id) => {
        const product = this.newData.find((item) => item.id === id);
        const newItem = createObject(product, 'subtract');
        if (product.amount < 1) return false;
        Object.assign(this.newData.find(n => n.id === id), newItem);
        this.add(id);
    }

    add = (id) => {
        const productOriginal = data.find((item) => item.id === id);
        const product = this.newData.find((item) => item.id === id);
        const itemIndex = findIndex(this.cartData, (i) => i.id === id);

        product.count = productOriginal.amount - product.amount;

        if (product.count > product.maxPerPerson) {
            product.amount = product.amount + 1;
            product.count = product.count - 1;

            alert(`${product.maxPerPerson} ${getTitle(product.maxPerPerson, 'товар')} можно добавить в корзину за 1 заказ`);

            return false;
        }

        if (itemIndex === -1) {
            this.cartData.push(product);
        }

        this.renderShoppingCart(id);
        this.renderCartTitle();
        this.render();
    }

    renderShoppingCart = () => {
        this.cartElement.innerHTML = '';
        this.cartData.forEach((item) => this.cartElement.innerHTML += getCartTemplate(item));
    }

    deleteFromCart = (id) => {
        const product = this.cartData.find((item) => item.id === id);
        const productData = this.newData.find((item) => item.id === id);

        if (product.count <= 1) {
            this.cartData.splice(this.cartData.findIndex((item) => item.id === id), 1);
        } else {
            const newItem = {
                productName: product.productName,
                price: product.price,
                amount: product.amount,
                count: product.count - 1,
                maxPerPerson: product.maxPerPerson
            };
            Object.assign(this.cartData.find(n => n.id === id), newItem);
        }

        const newI = createObject(productData, 'add');
        Object.assign(this.newData.find(n => n.id === id), newI);

        this.renderCartTitle();
        this.renderShoppingCart();
        this.render();
    }

    shoppingCartStrategy = (event) => {
        const dataset = event.target.dataset.dcShoppingCartRef;
        const id = parseInt(event.target.getAttribute('data-dc-shopping-cart-options'), 10);

        if (dataset === 'quantity') {
            this.addToCart(id);
        }

        if (dataset === 'delete') {
            this.deleteFromCart(id);
        }
    }
}
