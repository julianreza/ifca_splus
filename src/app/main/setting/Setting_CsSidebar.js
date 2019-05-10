import React from 'react';
import {withStyles, Icon, List, ListItem, ListItemText, ListSubheader, Button} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const styles = theme => ({
    listItem: {
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',
        borderRadius       : '0 20px 20px 0',
        paddingLeft        : 24,
        paddingRight       : 12,
        '&.active'         : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            fontSize: 16,
            width   : 16,
            height  : 16
        }
    }
});

function Setting_CsSidebar({classes, folders, filters, labels})
{
    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>
            <div className="flex-auto">
                <div className={classes.listWrapper}>
                    <List>
                        <ListItem
                            button
                            component={NavLink}
                            activeClassName="active"
                            to='/setting_cs/Section'
                            key='1'
                            className={classes.listItem}>
                            <ListItemText primary='Section' disableTypography={true}/>
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to='/setting_cs/CategoryGroup'
                            key='2'
                            activeClassName="active"
                            className={classes.listItem}>
                            <ListItemText primary='Category Group' disableTypography={true}/>
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to='/setting_cs/Category'
                            key='3'
                            activeClassName="active"
                            className={classes.listItem}>
                            <ListItemText primary='Category' disableTypography={true}/>
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to='/setting_cs/CustomerService'
                            key='4'
                            activeClassName="active"
                            className={classes.listItem}>
                            <ListItemText primary='Customer Service' disableTypography={true}/>
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to='/setting_cs/ComplainSource'
                            key='5'
                            activeClassName="active"
                            className={classes.listItem}>
                            <ListItemText primary='Complain Source' disableTypography={true}/>
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to='/setting_cs/Labour'
                            key='6'
                            activeClassName="active"
                            className={classes.listItem}>
                            <ListItemText primary='Labour' disableTypography={true}/>
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to='/setting_cs/Item'
                            key='7'
                            activeClassName="active"
                            className={classes.listItem}>
                            <ListItemText primary='Item' disableTypography={true}/>
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to='/setting_cs/Feedback'
                            key='8'
                            activeClassName="active"
                            className={classes.listItem}>
                            <ListItemText primary='Feedback' disableTypography={true}/>
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to='/setting_cs/Assign'
                            key='9'
                            activeClassName="active"
                            className={classes.listItem}>
                            <ListItemText primary='Assign' disableTypography={true}/>
                        </ListItem>
                    </List>
                </div>
            </div>
        </FuseAnimate>
    );
}

export default withStyles(styles, {withTheme: true})(Setting_CsSidebar);
