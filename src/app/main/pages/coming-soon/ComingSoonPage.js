import React, {Component} from 'react';
import {withStyles, Card, CardContent, Typography} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseCountdown, FuseAnimate} from '@fuse';
import classNames from 'classnames';
import _ from '@lodash';

const styles = theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color     : theme.palette.primary.contrastText
    }
});

class ComingSoonPage extends Component {

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>

                <div className="flex flex-col items-center justify-center w-full">

                    <FuseAnimate animation="transition.expandIn">

                        <Card className="w-full max-w-384">

                            <CardContent className="flex flex-col items-center justify-center p-32 text-center">

                                <img className="w-128 m-32" src="assets/images/logos/login.png" alt="logo"/>

                                <Typography variant="subtitle1" className="mb-16">
                                    Hey! Thank you for checking out our app.
                                </Typography>

                                <Typography color="textSecondary" className="max-w-288">
                                    It’s not quite ready yet, but we are working hard and it will be ready in approximately:
                                </Typography>

                                <FuseCountdown endDate="2019-04-1" className="my-48"/>

                            </CardContent>
                        </Card>
                    </FuseAnimate>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ComingSoonPage);
