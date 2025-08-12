import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../components/reducers/cartReducer";
import searchReducer from '../components/reducers/searchReducer'
import restaurantReducer from '../components/reducers/restaurantReducer'


export const store = configureStore({
    reducer:{
        cartReducer,
        searchReducer,
        restaurantReducer,
    }
})