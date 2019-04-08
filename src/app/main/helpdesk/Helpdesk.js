import React, {Component} from 'react';
import {withStyles, List, Tab, Tabs} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import Ticket from './tabs/Ticket';
import Application from './tabs/Application';

class Helpdesk extends Component {

    state = {
        value       : 0
    };

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    handleChange = (event, value) => {
        this.setState({value});
    };    

    render()
    {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="p-24"><h1>Helpdesk</h1></div>
                }
                contentToolbar={
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        textColor="primary"
                        variant="fullWidth"
                        scrollButtons="off"
                        className="w-full h-64"
                    >
                        <Tab className="h-64" label="Ticket Entry"/>
                        <Tab className="h-64" label="Application Entry"/>
                    </Tabs>
                }
                content={
                    <div className="p-24">
                        {value === 0 &&
                        (
                            <List component="nav">
                                <Ticket/>
                            </List>
                        )}
                        {value === 1 && (
                            <List component="nav">
                                <Application/>
                            </List>
                        )}
                    </div>
                }
            />
        )
    }
}

export default withStyles({withTheme: true})(Helpdesk);