import dbService from 'app/services/dbService';
import {setUserData} from './user.actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({email, password})
{
    return (dispatch) =>
        dbService.login(email, password)
        .then((user) => {
            user = user[0]
            const token = user[1]
            const userdata = {
                role  : user.Group_Cd,
                token : token,
                data: {
                    displayName: user.name,
                    photoURL   : user.pict,
                    gender     : user.gender,
                    email      : email,
                    handphone  : user.Handphone,
                    whatsapp   : user.wa_no,
                    address    : user.address1 + ', ' + user.address2 + ', ' + user.address3
                }
            }
            dispatch(setUserData(userdata));
            return dispatch({
                type: LOGIN_SUCCESS
            });
        })
        .catch(error => {
            return dispatch({
                type   : LOGIN_ERROR,
                payload: error
            });
        });
}
