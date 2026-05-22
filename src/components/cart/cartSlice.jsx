import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const storedCart =
    JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
    item: storedCart,
};

const cartSlice = createSlice({
    name: "cart",

    initialState,

    reducers: {
        increamentCart: (state, actions) => {

            const {
                productId,
                quantity,
                title,
                price,
                thumbnail,
            } = actions.payload;

            const indexProd = state.item.findIndex(
                (item) => item.productId === productId
            );

            if (indexProd >= 0) {

                state.item[indexProd].quantity += quantity;

            } else {

                state.item.push({
                    productId,
                    quantity,
                    title,
                    price,
                    thumbnail,
                });

            }

            // Save localStorage
            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.item)
            );
        },

        decreamentCart: (state, actions) => {

            const { productId, quantity } =
                actions.payload;

            const indexProd = state.item.findIndex(
                (item) => item.productId === productId
            );

            if (indexProd >= 0) {

                state.item[indexProd].quantity -= quantity;

                // Remove item
                if (
                    state.item[indexProd].quantity <= 0
                ) {

                    state.item.splice(indexProd, 1);

                }

            }

            // Save localStorage
            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.item)
            );
        },

        // Optional Clear Cart
        clearCart: (state) => {

            state.item = [];

            localStorage.removeItem("cartItems");

        },
    },
});

export const {
    increamentCart,
    decreamentCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;