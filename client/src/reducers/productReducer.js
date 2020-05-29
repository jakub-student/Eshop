const initState = {
    products: []
}

const productReducer = (state = initState, action ) => {
    switch(action.type) {
        case 'CREATE_PRODUCT':
            console.log(action.product)
            return {
                ...state,
                products: [...state.products, action.product]
            };
        case 'EDIT_PRODUCT':
            return {
                ...state,
                products: state.products.map(product => {
                    if(product._id === action.product._id){
                        product.name = action.product.name;
                        product.price = action.product.price;
                        product.atStore = action.product.atStore;
                        product.description = action.product.description;
                    }
                    return product
                })
            };
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(product=> action.id !== product._id)
            };
        case 'LOAD_PRODUCTS':
            return {
                ...state,
                products: [...state.products, ...action.products]
            };
        case 'DECREASE_PRODUCT_AT_STORE':
            return {
                ...state,
                products: state.products.map(product => {
                    if(product._id === action.id){
                        product.atStore -= action.quantity;
                    }
                    return product
                })
            };
        default:
            return state;
    }
}

export default productReducer;