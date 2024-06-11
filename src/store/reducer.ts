// third-party
import { combineReducers } from 'redux';

// project imports
import tokenReducer from './slices/token';
import snackbarReducer from './slices/snackbar';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    token: tokenReducer
});

export default reducer;
