import React, {Component} from 'react';
import { Button, Card, CardContent, Typography, withStyles, Avatar, AppBar, Toolbar, MenuItem} from '@material-ui/core';
import {FuseAnimate, FusePageSimple, TextFieldFormsy, SelectFormsy} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import dbService from 'app/services/dbService';
import * as Actions from 'app/store/actions';
import * as userActions from 'app/auth/store/actions';
import {bindActionCreators} from 'redux';
import Formsy, {addValidationRule} from 'formsy-react';
import _ from '@lodash';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {isBrowser,isMobile} from "react-device-detect";


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

class EditProfile extends Component {

    state = {
        canSubmit   : false,
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

    onSubmit = (model) => {
        model.wherename = this.props.user.data.displayName
        dbService.editProfile(model)
        .then((user) => {
            console.log(user)
            const userdata = {
                role  : user[2].Group_Cd,
                token : user[1],
                data: {
                    displayName: user[2].name,
                    photoURL   : user[2].pict,
                    gender     : user[2].gender,
                    email      : user[2].email,
                    handphone  : user[2].Handphone,
                    whatsapp   : user[2].wa_no,
                    address    : user[2].address1 + ', ' + user[2].address2 + ', ' + user[2].address3
                }
            }
            this.props.setUserData(userdata);
            this.props.showMessage({
                message: user[0],
                variant: 'success'
            });
        })
        .catch(error => {
            this.props.showMessage({message: error});
        });
    };

    componentDidMount() {
    
        if (isBrowser){
            this.setState({
                colh : 12,
                cold1 : 1,
                cold2 : 11
            })
        }
        else if(isMobile){
            this.setState({
                colh : 24,
                cold1 : 6,
                cold2 : 18
            })
        }
    }

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
                                        Edit Profile
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <CardContent>
                                <Formsy
                                    onValidSubmit={this.onSubmit}
                                    onValid={this.enableButton}
                                    onInvalid={this.disableButton}
                                    ref={(form) => this.form = form}
                                    className="flex flex-col justify-center">

                                    <TextFieldFormsy
                                        className="my-16"
                                        type="text"
                                        name="Name"
                                        label="Name"
                                        variant="outlined"
                                        value={user.data.displayName}
                                        fullWidth/>

                                        <SelectFormsy
                                            className="my-16"
                                            name="Gender"
                                            label="Gender"
                                            value={user.data.gender}
                                            variant="outlined">
                                            <MenuItem value="Male">
                                                <em>Male</em>
                                            </MenuItem>
                                            <MenuItem value="Female">
                                                Female
                                            </MenuItem>
                                        </SelectFormsy>

                                    <TextFieldFormsy
                                        className="my-16"
                                        type="text"
                                        name="UserName"
                                        label="Email"
                                        variant="outlined"
                                        value={user.data.email}
                                        fullWidth/>

                                    <GridList cellHeight={80} cols={this.state.colh}>
                                        <GridListTile key='code' cols={this.state.cold1}>
                                            <SelectFormsy
                                                className="my-16"
                                                name="codeh"
                                                label=""
                                                value="62"
                                                variant="outlined">
                                                <MenuItem value="62">
                                                    <em>+62</em>
                                                </MenuItem>
                                            </SelectFormsy>
                                        </GridListTile>
                                        <GridListTile key='number' cols={this.state.cold2}>
                                            <TextFieldFormsy
                                                className="my-16"
                                                label="Handphone"
                                                type="number"
                                                name="Handphone"
                                                variant="outlined"
                                                value={user.data.handphone}
                                                fullWidth/>
                                        </GridListTile>
                                    </GridList>

                                    <GridList cellHeight={80}  cols={this.state.colh}>
                                        <GridListTile key='code' cols={this.state.cold1}>
                                            <SelectFormsy
                                                className="my-16"
                                                name="codew"
                                                label=""
                                                value="62"
                                                variant="outlined">
                                                <MenuItem value="62">
                                                    <em>+62</em>
                                                </MenuItem>
                                            </SelectFormsy>
                                        </GridListTile>
                                        <GridListTile key='number' cols={this.state.cold2}>
                                            <TextFieldFormsy
                                                className="my-16"
                                                label="Whatsapp"
                                                type="number"
                                                name="wa_no"
                                                variant="outlined"
                                                value={user.data.whatsapp}
                                                fullWidth/>
                                        </GridListTile>
                                    </GridList>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="w-224 mx-auto mt-16"
                                        aria-label="Reset"
                                        disabled={!canSubmit}>
                                        SAVE PROFILE
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
            setUserData        : userActions.setUserData,
            showMessage        : Actions.showMessage,
            hideMessage        : Actions.hideMessage
        },
        dispatch);
}

function mapStateToProps({auth})
{
    return {
        login: auth,
        user: auth.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile)));

