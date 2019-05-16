import React, {Component} from 'react';
import {withStyles, List, Tab, Tabs} from '@material-ui/core';
import {FusePageCarded} from '@fuse';
import Ticket from './tabs/Ticket';
import Application from './tabs/Application';
import * as Actions from './store/actions';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';

class Helpdesk extends Component {

    state = {
        value       : 0
    };

    componentDidMount()
    {
        this.props.getDebtor();
        this.props.getCategory('R');
    }

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
                        className="w-full h-64">
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

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getDebtor     : Actions.getDebtor,
        getCategory   : Actions.getCategory
    }, dispatch);
}

export default withReducer('helpdesk', reducer)(withStyles({withTheme: true})(connect(null, mapDispatchToProps)(Helpdesk)));