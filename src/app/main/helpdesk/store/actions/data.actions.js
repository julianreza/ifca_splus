import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import history from 'history.js';

export const GET_DEBTOR = '[HELPDESK] GET DEBTOR';
export const GET_LOTNO = '[HELPDESK] GET LOTNO';
export const GET_CATEGORY = '[HELPDESK] GET CATEGORY';
export const SAVE_TICKET = '[HELPDESK] SAVE TICKET';

const token = JSON.parse(window.localStorage.getItem('token'))
const dataproject = JSON.parse(window.localStorage.getItem('dataproject'))
let params = {
    cons    : dataproject.cons,
    entity  : dataproject.entity_cd,
    project : dataproject.project_no
}

export function getDebtor()
{
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_ticket_entry/getDataDebtor', params, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DEBTOR,
                payload: response.data.Data
            })
        );
}

export function getLotNo(debtor)
{
    params.debtor_acct = debtor
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_ticket_entry/getDataLot', params, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LOTNO,
                payload: response.data.Data
            })
        );
}

export function getCategory(type)
{
    params.type_cd = type
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_ticket_entry/getDataCategory', params, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CATEGORY,
                payload: response.data.Data
            })
        );
}

export function saveTicket(data)
{
    const datauser = JSON.parse(window.localStorage.getItem('data'))
    data.append('cons',params.cons)
    data.append('entity',params.entity_cd)
    data.append('project',params.project_no)
    data.append('audit_user',datauser.name)
    data.append('userID',datauser.rowID)
    data.append('email',datauser.email)
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_ticket_entry/saveTicketReact', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token,
        }})

        return (dispatch) =>
        request.then(
            (response) => {
                dispatch(showMessage({
                    message: response.data.Pesan,
                    variant: 'success'
                }))
                
                history.push({
                    pathname: '/dashboards'
                })
            },
            (error) => {
                dispatch(showMessage({
                    message: error.data.Pesan,
                    variant: 'danger'

                }));
            });
}

