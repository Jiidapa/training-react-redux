import { ADD_CART } from '../actions/cartAction'

const initState = {
    cart: [],
    total: 0
}

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_CART:
            return {
                cart: action.payload.cart,
                total: action.payload.total
            }
        default:
            return state
    }
}

export default cartReducer