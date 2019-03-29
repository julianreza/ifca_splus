import React, {Component} from 'react';
import { Button, Card, CardContent, Typography, withStyles, Avatar, AppBar, Toolbar} from '@material-ui/core';
import {FuseAnimate, FusePageSimple, TextFieldFormsy} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import dbService from 'app/services/dbService';
import * as Actions from 'app/store/actions';
import {bindActionCreators} from 'redux';
import Formsy, {addValidationRule} from 'formsy-react';
import _ from '@lodash';

addValidationRule('password', (values, value) => {
    if (value === values.password){
        return true
    }
    else{
        return false
    }
});

const styles = theme => ({
    layoutHeader : {
        height                        : 150,
        minHeight                     : 150,
        [theme.breakpoints.down('md')]: {
            height   : 220,
            minHeight: 220
        }
    }
});

class ResetPassword extends Component {

    state = {
        canSubmit      : false
    };

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };    

    // canBeSubmitted()
    // {
    //     const {cpassword, password, passwordConfirm} = this.state;
    //     cpassword.length > 0 &&            
    //     password.length > 0 &&
    //     password === passwordConfirm && this.enableButton()
    // }

    onSubmit = (model) => {
        model.email = this.props.user.data.email
        dbService.resetPass(model)
        .then((user) => {
            this.props.showMessage({message: user});
        })
        .catch(error => {
            this.props.showMessage({message: error});
        });
    };

    render()
    {
        const {classes, user} = this.props;
        const {canSubmit} = this.state;

        return (
            <FusePageSimple
                classes={{
                    header : classes.layoutHeader,
                    toolbar: "px-16 sm:px-24"
                }}
                header={
                    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
                        <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                            {
                                user.data.photoURL ?
                                (
                                    <Avatar className="w-96 h-96" alt="user photo" src={user.data.photoURL}/>
                                )
                                :
                                (
                                    <Avatar className="w-96 h-96">
                                        {user.data.displayName[0]}
                                    </Avatar>
                                )
                            }
                            </FuseAnimate>
                            <div className="hidden md:flex flex-col ml-12 items-start">
                            <Typography component="span" className="normal-case text-40 flex">
                                {user.data.displayName}
                            </Typography>
                            <Typography className="text-20" color="textSecondary">
                                {user.data.email}
                            </Typography>
                        </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <Link to="/profile/profile_information"><Button className="mr-8 normal-case" variant="contained" color="secondary" aria-label="Follow">Back</Button></Link>
                        </div>
                    </div>
                }
                content={
                    <div className="p-16 sm:p-24">
                        <Card className="w-full mb-16">
                            <AppBar position="static" elevation={0}>
                                <Toolbar className="pl-16 pr-8">
                                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                                        Reset Password
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <CardContent>
                                <Typography variant="h6" className="mt-16 mb-32">RESET YOUR PASSWORD</Typography>

                                <Formsy
                                    onValidSubmit={this.onSubmit}
                                    onValid={this.enableButton}
                                    onInvalid={this.disableButton}
                                    ref={(form) => this.form = form}
                                    className="flex flex-col justify-center">

                                    <TextFieldFormsy
                                        className="mb-16"
                                        autoFocus
                                        type="password"
                                        name="cpassword"
                                        label="Current Password"
                                        variant="outlined"
                                        required
                                        fullWidth/>

                                    <TextFieldFormsy
                                        className="mb-16"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />

                                    <TextFieldFormsy
                                        className="mb-16"
                                        label="Password (Confirm)"
                                        type="password"
                                        name="passwordConfirm"
                                        validations='password'
                                        validationErrors={{password: 'Password Not Same'}}
                                        variant="outlined"
                                        required
                                        fullWidth/>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="w-224 mx-auto mt-16"
                                        aria-label="Reset"
                                        disabled={!canSubmit}>
                                        RESET MY PASSWORD
                                    </Button>
                                </Formsy>
                            </CardContent>
                        </Card>
                    </div>
                }
            />
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            showMessage        : Actions.showMessage,
            hideMessage        : Actions.hideMessage
        },
        dispatch);
}

function mapStateToProps({auth})
{
    return {
        user: auth.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword)));

