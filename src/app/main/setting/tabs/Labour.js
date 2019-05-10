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

class Labour extends Component {

    componentDidMount()
    {
        this.props.getLabour();
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
                            Header: "Labour Id",
                            accessor: "staff_id",
                            width : 150,
                        },
                        {
                            Header: "Name",
                            accessor: "name",
                            minWidth : 300
                        },
                        {
                            Header: "Division",
                            accessor: "div_cd",
                            width : 100
                        },
                        {
                            Header: "Departement",
                            accessor: "dept_cd",
                            width : 100
                        },
                        {
                            Header: "Doc Type",
                            accessor: "prefix",
                            width : 100
                        },
                    ]}
                    data={data}
                    defaultPageSize={5}
                    noDataText="No Labour found" 
                />
            </FuseAnimate>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getLabour       : Actions.getLabour,
        openNewDialog   : Actions.openNewDialog
    }, dispatch);
}

function mapStateToProps({labour})
{
    return {
        data: labour.section.labour
    }
}
export default withReducer('labour', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Labour)));
