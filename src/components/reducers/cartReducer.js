import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        setAddItem(state, action) {
            const existingItem = state.items.find(
                (i) => i.card.info.id === action.payload.card.info.id
            );
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem(state, action) {
            const existingItem = state.items.find(
                (i) => i.card.info.id === action.payload
            );
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        (item) => item.card.info.id !== action.payload
                    );
                }
            }
        },
        setClearCart(state) {
            state.items = [];
        },
        // Optional: still keep setDeleteIntem if you want last item removal
        setDeleteIntem(state) {
            state.items.pop();
        }
    }
});

export const { setAddItem, removeItem, setClearCart, setDeleteIntem } = cartReducer.actions;
export default cartReducer.reducer;

//Old Code
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     items: [],
// };

// const cartReducer = createSlice({
//     name: "cartReducer",
//     initialState,
//     reducers: {
//         setAddItem(state, action) {
//             state.items.push(action.payload);
//         },
//         setDeleteIntem(state) {
//             state.items.pop();
//         },
//         setClearCart(state) {
//             state.items.length = 0; 
//         },
//         removeItem(state, action) {
//             state.items = state.items.filter(
//             item => item.card.info.id !== action.payload
//             );
//         }
//     }
// });

// export const { setAddItem, setClearCart, setDeleteIntem, removeItem } = cartReducer.actions;
// export default cartReducer.reducer;
