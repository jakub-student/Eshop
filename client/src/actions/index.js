export const loadProducts = (products) => {
    return {
        type: 'LOAD_PRODUCTS',
        products
    };
};

export const createProduct = (product) => {
    return {
        type: 'CREATE_PRODUCT',
        product
    };
};

export const editProduct = (product) => {
    return {
        type: 'EDIT_PRODUCT',
        product
    };
};

export const deleteProduct = (id) => {
    return {
        type: 'DELETE_PRODUCT',
        id
    };
};

export const decreaseProductAtStore = (id, quantity) => {
    return {
        type: 'DECREASE_PRODUCT_AT_STORE',
        id,
        quantity
    }
}

export const addToCart = (item) => {
    return {
        type: 'ADD_TO_CART',
        item
    };
};

export const removeFromCart = (id) => {
    return {
        type: 'REMOVE_FROM_CART',
        id
    };
};

export const increaseQuantity = (id) => {
    return {
        type: 'INCREASE_QUANTITY',
        id
    }
}

export const decreaseQuantity = (id) => {
    return {
        type: 'DECREASE_QUANTITY',
        id
    }
}

export const setQuantity = (id, quantity) => {
    return {
        type: 'SET_QUANTITY',
        id,
        quantity
    }
}

export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    }
}

