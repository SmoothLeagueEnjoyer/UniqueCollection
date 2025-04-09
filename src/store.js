import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './FilterSlice';
import gsHistoryReducer from './GSHistorySlice';


export default configureStore({
  reducer: {
    filter: filterReducer,
    ghHistory: gsHistoryReducer,
  },
});
