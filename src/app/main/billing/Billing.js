import React, {Component} from 'react';
import {FusePageCarded} from '@fuse';
import {withStyles, List, ListItem, ListItemText } from '@material-ui/core';

const styles = theme => ({
    layoutRoot: {}
});

class Billing extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="p-24"><h1>Billing Info wer</h1></div>
                }
                contentToolbar={
                    <div className="px-24"><h4>Content Toolbar</h4></div>
                }
                content={
                    <div className="p-24">
                        <List component="nav">
                            <ListItem button>
                                <h1>Test 1</h1>
                            </ListItem>
                            <ListItem button>
                                <h1>Test 1</h1>
                            </ListItem>
                            <ListItem button>
                                <h1>Test 1</h1>
                            </ListItem>
                            <ListItem button>
                                <h1>Test 1</h1>
                            </ListItem>
                        </List>
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(Billing);