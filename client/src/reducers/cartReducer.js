const initState = {
    cart: []
}

const cartReducer = (state = initState, action ) => {
    switch(action.type) {
        case 'ADD_TO_CART':
            const found = state.cart.find(item => item.id === action.item.id);
            if (found == "undefined" || found == null){
                return {
                    ...state,
                    cart: [...state.cart, action.item]
                }
            } else {
                return {
                    ...state,
                    cart: state.cart.map(item => {
                        if(item === found){
                            if(item.quantity < item.atStore){
                                item.quantity += 1
                            }
                        }
                        return item
                    })
                }
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(product=> action.id !== product.id)
            };
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item => {
                    if(item.id === action.id){
                        item.quantity += 1
                    }
                    return item
                })
            };
        case 'DECREASE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item => {
                    if(item.id === action.id){
                        item.quantity -= 1
                    }
                    return item
                })
            };
        case 'SET_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item => {
                    if(item.id === action.id){
                        item.quantity = action.quantity
                    }
                    return item
                })
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
}

export default cartReducer;