import React, {Component} from 'react';
import {withStyles, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import ReactTable from "react-table";


const styles = theme => ({});

class Category extends Component {

    componentDidMount()
    {
        this.props.getCategory();
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
                            Header   : () => (
                                <Typography className='m-16'>No</Typography>
                            ),
                            width : 50,
                            className : "font-bold h-64 justify-center",
                            Cell: (row) => {
                                return <div>{row.index+1}.</div>;
                            }
                        },
                        {
                            Header: "Code",
                            accessor: "category_cd",
                            maxWidth: 60,
                        },
                        {
                            Header: "Descs",
                            accessor: "descs",
                            minWidth: 300,
                        },
                        {
                            Header: "Priority",
                            accessor: "category_priority",
                            maxWidth: 75,
                            Cell: (row) => {
                                return <div>{ row.value === 1 ? 'Low' : row.value === 2 ? 'Medium' : 'High' }</div>;
                            }
                        },
                        {
                            Header: "Supervisor ID",
                            accessor: "user_spv",
                        },
                        {
                            Header: "Type",
                            accessor: "complain_type",
                            maxWidth: 90,
                            Cell: (row) => {
                                return <div>{
                                    row.value === 'C' ? 'Complain' :
                                    row.value === 'R' ? 'Request' :
                                    row.value === 'A' ? 'Access' :
                                    row.value === 'T' ? 'Telphone' :
                                    'Parking'
                                }</div>;
                            }
                        },
                        {
                            Header: "Group",
                            accessor: "category_group_cd",
                        },
                      ]}
                    data={data}
                    defaultPageSize={6}
                    showPageSizeOptions={false}
                    noDataText="No contacts found"                 
                />
            </FuseAnimate>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCategory     : Actions.getCategory,
        openNewDialog   : Actions.openNewDialog
    }, dispatch);
}

function mapStateToProps({category})
{
    return {
        data: category.section.category
    }
}
export default withReducer('category', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Category)));
