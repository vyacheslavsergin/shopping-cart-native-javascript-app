const getAmount = (product, action) => {

    let expression = null;

    switch (action) {
        case 'subtract':
            expression = product.amount - 1;
            break;

        case 'add':
            expression = product.amount + 1;
            break;

        default:
            expression = null;
    }

    return expression;
};

export const createObject = (product, action) => {
    const newItem = {
        productName: product.productName,
        price: product.price,
        amount: getAmount(product, action),
        maxPerPerson: product.maxPerPerson
    };

    return newItem;
};
