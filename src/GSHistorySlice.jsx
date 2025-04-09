import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    stashData: [],
    people: [],
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
        setUniqueByColumn: (state, action) => {
            const column = action.payload;
            const seen = new Set();
            state.filtered = state.data.filter(row => {
                const value = row[column];
                if (seen.has(value)) return false;
                seen.add(value);
                return true;
            });
        }
    }
});

export const {
    setHistory,
    setPeople,
} = GSHistorySlice.actions;
export default GSHistorySlice.reducer;