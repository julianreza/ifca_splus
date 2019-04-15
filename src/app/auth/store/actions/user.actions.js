import history from 'history.js';
import {setDefaultSettings, setInitialSettings} from 'app/store/actions/fuse';
import dbService from 'app/services/dbService';

export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

export function setUserData(user)
{
    return (dispatch) => {

        /*
        Set User Settings
         */
        dispatch(setDefaultSettings(user.data.settings));

        /*
        Set User Data
         */
        dispatch({
            type   : SET_USER_DATA,
            payload: user
        })
    }
}


/**
 * Remove User Data
 */
export function removeUserData()
{
    return {
        type: REMOVE_USER_DATA
    }
}

/**
 * Logout
 */
export function logoutUser()
{

    return (dispatch, getState) => {

        const user = getState().auth.user;

        if ( user.role === 'guest' )
        {
            return null;
        }

        history.push({
            pathname: '/project'
        });

        dbService.logout();

        dispatch(setInitialSettings());

        dispatch({
            type: USER_LOGGED_OUT
        })
    }
}

