import * as Actions from '../actions';

const initialState = {
    section         : [],
    category        : [],
    categorygroup   : [],
    customerservice : [],
    complainsource  : [],
    labour          : [],
    item            : [],
    feedback        : [],
    assign          : [],
};

const dataReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SECTION:
        {
            return {
                ...state,
                section: action.payload
            };
        }
        case Actions.GET_CATEGORY:
        {
            return {
                ...state,
                category: action.payload
            };
        }
        case Actions.GET_CATEGORY_GROUP:
        {
            return {
                ...state,
                categorygroup: action.payload
            };
        }
        case Actions.GET_CUSTOMER_SERVICE:
        {
            return {
                ...state,
                customerservice: action.payload
            };
        }
        case Actions.GET_COMPLAIN_SOURCE:
        {
            return {
                ...state,
                complainsource: action.payload
            };
        }
        case Actions.GET_LABOUR:
        {
            return {
                ...state,
                labour: action.payload
            };
        }
        case Actions.GET_ITEM:
        {
            return {
                ...state,
                item: action.payload
            };
        }
        case Actions.GET_FEEDBACK:
        {
            return {
                ...state,
                feedback: action.payload
            };
        }
        case Actions.GET_ASSIGN:
        {
            return {
                ...state,
                assign: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default dataReducer;
