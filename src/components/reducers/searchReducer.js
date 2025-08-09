import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValues : "",
}

const searchReducer = createSlice({
    name:"searchValues",
    initialState,
    reducers :{
        setSearchValues(state,action){
             state.searchValues = action.payload;
        }
    }
})

export const {setSearchValues} = searchReducer.actions;

export default searchReducer.reducer;