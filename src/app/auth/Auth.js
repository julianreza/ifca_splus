import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as userActions from 'app/auth/store/actions';
import {bindActionCreators} from 'redux';
import * as Actions from 'app/store/actions';
import dbService from 'app/services/dbService';
const data = JSON.parse(window.localStorage.getItem('data'))

class Auth extends Component {
    /*eslint-disable-next-line no-useless-constructor*/
    constructor(props)
    {
        super(props);
        this.dbCheck();
    }
    
    dbCheck = () => {
        if (data){
            dbService.getData()
            .then(user => {
                user = user[0]
                const token = user[1]
                const userdata = {
                    role  : user.Group_Cd,
                    token : token,
                    data: {
                        displayName: user.name,
                        photoURL   : user.pict,
                        gender     : user.gender,
                        email      : user.email,
                        handphone  : user.Handphone,
                        whatsapp   : user.wa_no,
                        address    : user.address1 + ', ' + user.address2 + ', ' + user.address3
                    }
                }
                this.props.setUserData(userdata);
                this.props.showMessage({message: 'Login With ' + user.email});
            })
            .catch(error => {
                this.props.showMessage({message: error});
            })
        }
    };

    render()
    {
        const {children} = this.props;

        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            setUserData        : userActions.setUserData,
            showMessage        : Actions.showMessage,
            hideMessage        : Actions.hideMessage
        },
        dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
