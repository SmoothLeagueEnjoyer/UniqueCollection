import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    leagues: [],
    accounts: [],
    stashes: [],
    stashActions: ["removed", "added", "modified"],
};

const FilterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        addLeagues(state, action) {
            state.leagues = action.payload;
        },
        addAccounts(state, action) {
            state.accounts = action.payload;
        },
        addStashes(state, action) {
            state.stashes = action.payload;
        },

    }
});

export const {
    addLeagues,
    addAccounts,
    addStashes
} = FilterSlice.actions;
export default FilterSlice.reducer;