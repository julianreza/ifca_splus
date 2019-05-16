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
import reducer from './store/reducers';
import withReducer from 'app/store/withReducer';
import New_Section from './form/New_Section';
import New_CategoryGroup from './form/New_CategoryGroup';
import New_Category from './form/New_Category';
import New_CustomerService from './form/New_CustomerService';
import New_ComplainSource from './form/New_ComplainSource';
import New_Labour from './form/New_Labour';
import New_Item from './form/New_Item';
import New_Feedback from './form/New_Feedback';
import New_Assign from './form/New_Assign';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 10,
        bottom  : 10,
        zIndex  : 99
    }
});

class Setting_Cs extends Component {

    render()
    {
        const {classes, openDialog} = this.props;
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
                        onClick={() => openDialog({
                            children : [
                            tabs === 'Section' && (<New_Section/>),
                            tabs === 'CategoryGroup' && (<New_CategoryGroup/>),
                            tabs === 'Category' && (<New_Category/>),
                            tabs === 'CustomerService' && (<New_CustomerService/>),
                            tabs === 'ComplainSource' && (<New_ComplainSource/>),
                            tabs === 'Labour' && (<New_Labour/>),
                            tabs === 'Item' && (<New_Item/>),
                            tabs === 'Feedback' && (<New_Feedback/>),
                            tabs === 'Assign' && (<New_Assign/>)
                            ]
                        })}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openDialog     : Actions.openDialog,
    },
    dispatch);
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(null, mapDispatchToProps)(Setting_Cs)));
