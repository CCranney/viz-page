import { createSlice } from "@reduxjs/toolkit";


const initialState = Array(2).fill(false);

const visibilitySlice = createSlice({
    name: 'visibility',
    initialState,
    reducers: {
        changeVisibility(state, action){
            state[action.payload] = !state[action.payload];
        }
    },

});

export const {changeVisibility} = visibilitySlice.actions;

export default visibilitySlice.reducer;
