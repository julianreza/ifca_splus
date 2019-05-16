import axios from 'axios';

class dbService {

    login = (email, password) => {
        const params = {
            'email':email,
            'password':password,
            'token':'',
            'device':'WEB',
            'mac':''
        }
        return new Promise((resolve, reject) => {
            axios.post('http://35.198.219.220:2121/alfaAPI/c_auth/loginReact', params, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                const data = response.data
                if ( data.Error===false ){   
                    localStorage.setItem('data', JSON.stringify(data.Data[0]))
                    localStorage.setItem('token', JSON.stringify(data.Token))
                    resolve([data.Data[0],data.Token]);
                }
                else{
                    var error = {}
                    if(data.Wrong==='Email'){
                        error = {email: data.Pesan};
                    }
                    if(data.Wrong==='Password'){
                        error = {password: data.Pesan};
                    }
                    reject(error);
                }
            });
        });
    };

    getData = () => {
        const data = JSON.parse(window.localStorage.getItem('data'))
        const token = JSON.parse(window.localStorage.getItem('token'))
        const dataproject = JSON.parse(window.localStorage.getItem('dataproject'))
        if (!data){
            return;
        }  
        return new Promise((resolve) => {
            resolve([data,token,dataproject]);            
        })
    }

    getDataNaP = () => {
        const token = JSON.parse(window.localStorage.getItem('token'))
        return new Promise((resolve, reject) => {
            axios.post('http://35.198.219.220:2121/alfaAPI/c_newsandpromo/getDatanews2/IFCAMOBILE/1500/1502', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                }
            }).then(response => {
                const data = response.data
                if(data.Error===false){
                    resolve(data.Data);
                }
                else{
                    reject(data.Pesan);
                }
            });
        });
    }

    getDataProject = () => {
        const token = JSON.parse(window.localStorage.getItem('token'))
        const data = JSON.parse(window.localStorage.getItem('data'))
        const email = data.email
        return new Promise((resolve, reject) => {
            axios.post('http://35.198.219.220:2121/alfaAPI/c_product_info/getData/IFCAMOBILE/'+email, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token,
                }
            }).then(response => {
                const data = response.data
                if(data.Error===false){
                    resolve(data.Data);
                }
                else{
                    reject(data.Pesan);
                }
            });
        });
    }

    getDataTicketByMonth = () => {
        const token = JSON.parse(window.localStorage.getItem('token'))
        const dataproject = JSON.parse(window.localStorage.getItem('dataproject'))
        const params = {
            cons    : dataproject.cons,
            entity  : dataproject.entity_cd,
            project : dataproject.project_no
        }
        return new Promise((resolve, reject) => {
            axios.post('http://35.198.219.220:2121/alfaAPI/c_ticket_history/getDataTicketByMonth', params, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token,
                }
            }).then(response => {
                const data = response.data
                if(data.Error===false){
                    resolve(data.Data);
                }
                else{
                    reject(data.Pesan);
                }
            });
        });
    }

    saveTicket = (data) => {
        const token = JSON.parse(window.localStorage.getItem('token'))
        const dataproject = JSON.parse(window.localStorage.getItem('dataproject'))
        const datauser = JSON.parse(window.localStorage.getItem('data'))
        data.append('cons',dataproject.cons)
        data.append('entity',dataproject.entity_cd)
        data.append('project',dataproject.project_no)
        data.append('audit_user',datauser.name)
        data.append('userID',datauser.rowID)
        data.append('email',datauser.email)
        return new Promise((resolve, reject) => {
            axios.post('http://35.198.219.220:2121/alfaAPI/c_ticket_entry/saveTicketReact', data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                const data = response.data
                if(data.Error===false){
                    resolve(data.Pesan);
                }
                else{
                    reject(data.Pesan);
                }
            });
        });
    };

    logout = () => {
        localStorage.clear();
    };

    resetPass = (data) => {
        const token = JSON.parse(window.localStorage.getItem('token'))
        return new Promise((resolve, reject) => {
            axios.post('http://35.198.219.220:2121/alfaAPI/c_profil/changePassReact', data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token,
                }
            }).then(response => {
                const data = response.data
                if(data.Error===false){
                    resolve(data.Pesan);
                }
                else{
                    reject(data.Pesan);
                }
            });
        });
    };

    editProfile = (data) => {
        const token = JSON.parse(window.localStorage.getItem('token'))
        return new Promise((resolve, reject) => {
            axios.post('http://35.198.219.220:2121/alfaAPI/c_profil/save', data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token,
                }
            }).then(response => {
                const data = response.data
                if(data.Error===false){
                    localStorage.setItem('data', JSON.stringify(data.Data[0]))
                    resolve([data.Pesan,token,data.Data[0]]);
                }
                else{
                    reject(data.Pesan);
                }
            });
        });
    };
}

const instance = new dbService();
export default instance;