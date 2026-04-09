import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    item: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increamentCart: (state, actions) => {
            const { productId, quantity } = actions.payload;
            const indexProd = (state.item).findIndex(item => item.productId === productId);
            if (indexProd >= 0) {
                state.item[indexProd].quantity += quantity;
            }
            else {
                state.item.push({ productId, quantity });
            }
        },
        decreamentCart: (state, actions) => {
            const { productId, quantity } = actions.payload;
            const indexProd = state.item.findIndex(item => item.productId === productId);

            if (indexProd >= 0) {
                state.item[indexProd].quantity -= quantity;

                if (state.item[indexProd].quantity <= 0) {
                    state.item.splice(indexProd, 1);
                }
            }
        }
    }
})
export default cartSlice.reducer
export const { increamentCart, decreamentCart } = cartSlice.actions
