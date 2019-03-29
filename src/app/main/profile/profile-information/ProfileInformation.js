import React, {Component} from 'react';
import {withStyles, Avatar, AppBar, Button, Card, CardContent, Toolbar, Typography, Icon} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import { withRouter, Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

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

class ProfileInformation extends Component {
    
    render()
    {
        const {classes, user} = this.props;

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
                            <Link to="/profile/edit_profile"><Button className="mr-8 normal-case" variant="contained" color="secondary" aria-label="Follow">Edit Profile</Button></Link>
                            <Link to="/profile/reset_password"><Button className="normal-case" variant="contained" color="primary" aria-label="Reset Password">Reset Password</Button></Link>
                        </div>
                    </div>
                }
                content={
                    <div className="p-16 sm:p-24">
                        <Card className="w-full mb-16">
                            <AppBar position="static" elevation={0}>
                                <Toolbar className="pl-16 pr-8">
                                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                                        Profile Information
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <CardContent>
                                <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">Name</Typography>
                                    <Typography>{user.data.displayName}</Typography>
                                </div>

                                <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">Gender</Typography>
                                    <Typography>{user.data.gender}</Typography>
                                </div>

                                <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">Email</Typography>
                                    <Typography>{user.data.email}</Typography>
                                </div>

                                <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">Handphone</Typography>
                                    <Typography>{user.data.handphone}</Typography>
                                </div>

                                <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">Whatsapp</Typography>
                                    <Typography>{user.data.whatsapp}</Typography>
                                </div>

                                <div className="mb-24">
                                    <Typography className="font-bold mb-4 text-15">Address</Typography>
                                    <div className="flex items-center">
                                        <Typography>{user.data.address}</Typography>
                                        <Icon className="text-16 ml-4" color="action">location_on</Icon>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                }
            />
        )
    };
}

function mapStateToProps({auth})
{
    return {
        user: auth.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(ProfileInformation)));
