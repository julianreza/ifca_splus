import React, {Component} from 'react';
import {withStyles, Typography, Icon} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import ReactTable from "react-table";


const styles = theme => ({});

class Assign extends Component {

    componentDidMount()
    {
        this.props.getAssign();
    }

    render()
    {
        const {data} = this.props;
        console.log(data)

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable 
                    className="-striped -highlight border-0"
                    columns={[
                        {
                            Header: () => <Typography className='m-16'>No</Typography>,
                            width : 50,
                            className : "font-bold h-64 justify-center",
                            Cell: (row) => <div>{row.index+1}.</div>
                        },
                        {
                            Header: "User Id",
                            accessor: "user_id",
                            width: 80,
                        },
                        {
                            Header: "Labour Id",
                            accessor: "staff_id",
                            width: 100,
                        },
                        {
                            Header: "Name",
                            accessor: "staff_id",
                        },
                    ]}
                    data={data}
                    defaultPageSize={6}
                    showPageSizeOptions={false}
                    noDataText="No Item found" 
                />
            </FuseAnimate>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getAssign       : Actions.getAssign,
        openNewDialog   : Actions.openNewDialog
    }, dispatch);
}

function mapStateToProps({assign})
{
    return {
        data: assign.section.assign
    }
}
export default withReducer('assign', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Assign)));
