export const getTitle = (amount, name) => {
    let title = name;

    if (amount === 0 || amount > 4) {
        title = `${name}ов`;
        return title;
    } else if (amount > 1) {
        title = `${name}а`;
        return title;
    }

    return title;
};

const getDisabledClass = (amount) => {
    if (amount < 1) {
        return 'is-disabled';
    }

    return '';
}

export const getProducTemplate = (item) => {
    return `
        <li class="shopping-cart__item">
            <div>Осталось <b>${item.amount}</b> ${getTitle(item.amount, item.productName)} за <b>${item.price}</b> рублей</div>
            <button
                class="shopping-cart__add-button button ${getDisabledClass(item.amount)}"
                type="button"
                data-dc-shopping-cart-ref="quantity"
                data-dc-shopping-cart-options="${item.id}"
            >
                Добавить в корзину
            </button>
        </li>
    `
};

export const getCartTemplate = (item) => {
    return `
        <div class="shopping-cart__element-item">
            <span><b>${item.count}</b> ${getTitle(item.count, item.productName)} за <b>${item.price}</b> рублей добавлено</span>
            <button
                class="shopping-cart__element-delete-button button"
                type="button"
                data-dc-shopping-cart-ref="delete"
                data-dc-shopping-cart-options="${item.id}">Удалить</button>
        </div>
    `
}
