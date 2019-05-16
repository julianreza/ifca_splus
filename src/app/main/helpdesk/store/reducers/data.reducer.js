import * as Actions from '../actions';

const initialState = {
    debtor      : [],
    lotno       : [],
    category    : [],
};

const dataReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_DEBTOR:
        {
            return {
                ...state,
                debtor: action.payload
            };
        }
        case Actions.GET_LOTNO:
        {
            return {
                ...state,
                lotno: action.payload
            };
        }
        case Actions.GET_CATEGORY:
        {
            return {
                ...state,
                category: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default dataReducer;
