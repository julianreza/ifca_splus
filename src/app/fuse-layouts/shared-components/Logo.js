import React from 'react';
import {Typography, withStyles} from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
    root      : {
        '& .logo-icon': {
            width     : 50,
            height    : 50,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        }
    }
});

function Logo({classes})
{
    return (
        <div className={classNames(classes.root, "flex items-center")}>
            <img className="logo-icon" src="assets/images/logos/login.png" alt="logo"/>
            <Typography className="text-16 ml-12 font-light logo-text">IFCA CSM</Typography>
        </div>
    );
}

export default withStyles(styles, {withTheme: true})(Logo);
