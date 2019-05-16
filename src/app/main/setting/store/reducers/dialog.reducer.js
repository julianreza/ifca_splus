import * as Actions from '../actions';

const initialState = {
    openNewDialog : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const dialogReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.OPEN_NEW_DIALOG:
        {
            return {
                ...state,
                openNewDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_DIALOG:
        {
            return {
                ...state,
                openNewDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default dialogReducer;
