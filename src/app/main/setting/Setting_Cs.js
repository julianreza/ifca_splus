import React, {Component} from 'react';
import {withStyles, Hidden, Icon, IconButton, Fab} from '@material-ui/core';
import {FusePageCarded, FuseAnimate} from '@fuse';
import Setting_CsSidebar from './Setting_CsSidebar'
import Section from './tabs/Section';
import Category from './tabs/Category';
import CategoryGroup from './tabs/CategoryGroup';
import CustomerService from './tabs/CustomerService';
import ComplainSource from './tabs/ComplainSource';
import Labour from './tabs/Labour';
import Item from './tabs/Item';
import Feedback from './tabs/Feedback';
import Assign from './tabs/Assign';
import * as Actions from 'app/store/actions';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 10,
        bottom  : 12,
        zIndex  : 99
    }
});

class Setting_Cs extends Component {

    render()
    {
        const {classes, openDialog, closeDialog} = this.props;
        const tabs = this.props.match.params.tab;
        return (
            <React.Fragment>
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="flex flex-col flex-1">
                        <div className="flex items-center py-24">
                            <Hidden lgUp>
                                <IconButton
                                    onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                    aria-label="open left sidebar"
                                >
                                    <Icon>menu</Icon>
                                </IconButton>
                            </Hidden>
                            <div className="flex-1"><h4>Header</h4></div>
                        </div>
                    </div>
                }
                sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                innerScroll                
                content={
                    <div>
                        {tabs === 'Section' && (<Section/>)}
                        {tabs === 'CategoryGroup' && (<CategoryGroup/>)}
                        {tabs === 'Category' && (<Category/>)}
                        {tabs === 'CustomerService' && (<CustomerService/>)}
                        {tabs === 'ComplainSource' && (<ComplainSource/>)}
                        {tabs === 'ComplainSource' && (<ComplainSource/>)}
                        {tabs === 'Labour' && (<Labour/>)}
                        {tabs === 'Item' && (<Item/>)}
                        {tabs === 'Feedback' && (<Feedback/>)}
                        {tabs === 'Assign' && (<Assign/>)}
                    </div>
                }
                leftSidebarHeader={
                    <div className="p-24"><h4>Sidebar Header</h4></div>
                }
                leftSidebarContent={
                    <Setting_CsSidebar/>
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }} />
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={openDialog}
                    >
                        <Icon>person_add</Icon>
                    </Fab>
                </FuseAnimate>
                </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openDialog        : Actions.openDialog,
        closeDialog       : Actions.closeDialog
    },
    dispatch);
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(null, mapDispatchToProps)(Setting_Cs)));
