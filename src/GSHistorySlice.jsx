import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    stashData: [],
    people: []
};

const GSHistorySlice = createSlice({
    name: 'gshistory',
    initialState,
    reducers: {
        setHistory(state, action) {
            state.stashData = action.payload;

        },
        setPeople(state, action) {
            state.people = action.payload;

        },
    }
});

export const {
    setHistory,
    setPeople
} = GSHistorySlice.actions;
export default GSHistorySlice.reducer;