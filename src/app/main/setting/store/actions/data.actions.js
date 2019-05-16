import axios from 'axios';

export const GET_SECTION = '[SETTING] GET SECTION';
export const GET_CATEGORY = '[SETTING] GET CATEGORY';
export const GET_CATEGORY_GROUP = '[SETTING] GET CATEGORY GROUP';
export const GET_CUSTOMER_SERVICE = '[SETTING] GET CUSTOMER SERVICE';
export const GET_COMPLAIN_SOURCE = '[SETTING] GET COMPLAIN SOURCE';
export const GET_LABOUR = '[SETTING] GET LABOUR';
export const GET_ITEM = '[SETTING] GET ITEM';
export const GET_FEEDBACK = '[SETTING] GET FEEDBACK';
export const GET_ASSIGN = '[SETTING] GET ASSIGN';

export function getSection()
{
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_setting_cs/getDataSection', {cons : 'IFCAPB'}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_SECTION,
                payload: response.data.Data
            })
        );
}

export function getCategory()
{
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_setting_cs/getDataCategory', {cons : 'IFCAPB'}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CATEGORY,
                payload: response.data.Data
            })
        );
}

export function getCategoryGroup()
{
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_setting_cs/getDataCategoryGroup', {cons : 'IFCAPB'}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CATEGORY_GROUP,
                payload: response.data.Data
            })
        );
}

export function getCustomerService()
{
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_setting_cs/getDataService', {cons : 'IFCAPB'}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CUSTOMER_SERVICE,
                payload: response.data.Data
            })
        );
}

export function getComplainSource()
{
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_setting_cs/getDataComplain', {cons : 'IFCAPB'}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COMPLAIN_SOURCE,
                payload: response.data.Data
            })
        );
}

export function getLabour()
{
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_setting_cs/getDataLabour', {cons : 'IFCAPB'}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_LABOUR,
                payload: response.data.Data
            })
        );
}

export function getItem()
{
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_setting_cs/getDataItem', {cons : 'IFCAPB'}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ITEM,
                payload: response.data.Data
            })
        );
}

export function getFeedback()
{
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_setting_cs/getDataFeedback', {cons : 'IFCAPB'}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_FEEDBACK,
                payload: response.data.Data
            })
        );
}

export function getAssign()
{
    const request = axios.post('http://35.198.219.220:2121/alfaAPI/c_setting_cs/getDataAssign', {cons : 'IFCAPB'}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ASSIGN,
                payload: response.data.Data
            })
        );
}

