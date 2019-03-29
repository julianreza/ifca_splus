import React, { Component }  from 'react'
import { withStyles, Card, CardContent, Typography, InputAdornment, Icon, Button, Divider } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimate, TextFieldFormsy } from '@fuse';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import Formsy from 'formsy-react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';
import _ from '@lodash';

const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color: theme.palette.primary.contrastText
    }
});

class Login extends Component {

    state = {
        canSubmit: false,
        remember: true
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        this.props.submitLogin(model);
    };

    componentDidUpdate(prevProps, prevState)
    {
        if ( this.props.login.error && (this.props.login.error.email || this.props.login.error.password) )
        {
            this.form.updateInputsWithError({
                ...this.props.login.error
            });

            this.props.login.error = null;
            this.disableButton();
        }

        return null;
    }


    render() {
        const {classes} = this.props;
        const {canSubmit} = this.state;

        return ( 
            <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink p-24 md:flex-row md:p-0")}>

                {/* DIV KIRI */}
                <div className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">
                    <FuseAnimate animation="transition.expandIn">
                        <img className="w-200 mb-32" src="assets/images/logos/login.png" alt="logo"/>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="h3" color="inherit" className="font-light">
                            Welcome to the IFCA CSM
                        </Typography>
                    </FuseAnimate>
                    <FuseAnimate delay={400}>
                        <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                        Integrated and seamless property sales management software
                        </Typography>
                    </FuseAnimate>
                    <br></br>
                </div>

                {/* DIV KANAN */}
                <FuseAnimate animation={{translateX: [0, '100%']}}>
                    <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                            <Typography variant="h6" className="md:w-full mb-32">LOGIN TO YOUR ACCOUNT</Typography>

                            {/* START FORM */}
                            <Formsy className="flex flex-col justify-center w-full"
                            onValidSubmit={this.onSubmit}
                            onValid={this.enableButton}
                            onInvalid={this.disableButton}
                            ref={(form) => this.form = form} >

                                {/* INPUT EMAIL */}
                                <TextFieldFormsy className="mb-16"
                                type="text"
                                name="email"
                                label="Your Email"
                                validations={{isEmail:true}}
                                validationErrors={{isEmail: 'This is not a valid email'}}
                                InputProps={{endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>}}
                                variant="outlined"
                                required />

                                {/* INPUT PASSWOORD */}
                                <TextFieldFormsy className="mb-16"
                                type="password"
                                name="password"
                                label="Enter Password"
                                InputProps={{endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>}}
                                variant="outlined"
                                required />

                                {/* FORGOT PASSWORD */}
                                <div className="flex items-center justify-between">
                                    <Link className="font-medium" to="/pages/auth/forgot-password-2">
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* BUTTON LOGIN */}
                                <Button className="w-full mx-auto mt-16 normal-case"
                                type="submit"
                                variant="contained"
                                color="primary"
                                aria-label="LOG IN"
                                disabled={!canSubmit}
                                value="legacy" >
                                    Login
                                </Button>

                            {/* END FORM */}
                            </Formsy>

                            {/* TEXT OR */}
                            <div className="my-24 flex items-center justify-center">
                                <Divider className="w-32"/>
                                    <Typography variant="body2" className="md:w-full mx-8">OR</Typography>
                                <Divider className="w-32"/>
                            </div>

                            {/* BUTTON GOOGLE */}
                            <Button className="normal-case w-192 mb-8"
                            variant="contained"
                            color="primary"
                            size="small">
                                Log in with Google
                            </Button>

                            {/* BUTTON FACEBOOK */}
                            <Button className="normal-case w-192"
                            variant="contained"
                            color="secondary"
                            size="small">
                                Log in with Facebook
                            </Button>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            
            </div>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitLogin: authActions.submitLogin
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        login: auth.login,
        user : auth.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)));