import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    x: null,
    y: null,
    tooltipString: null,
};

const tooltipSlice = createSlice({
    name: 'tooltip',
    initialState,
    reducers: {
        activateTooltip(state, action){
            const newState = {
                x: action.payload.x,
                y: action.payload.y,
                tooltipString: action.payload.tooltipString
            }
            Object.assign(state, newState);

        },
        deactivateTooltip(state){
            Object.assign(state, initialState);
        }
    },

});

export const {activateTooltip, deactivateTooltip} = tooltipSlice.actions;

export default tooltipSlice.reducer;
