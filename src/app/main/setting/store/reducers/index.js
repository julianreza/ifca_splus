import {combineReducers} from 'redux';
import section from './data.reducer';
import dialog from './dialog.reducer';

const reducer = combineReducers({
    section,
    dialog,
});

export default reducer;
