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

class CategoryGroup extends Component {

    componentDidMount()
    {
        this.props.getCategoryGroup();
    }

    render()
    {
        const {data} = this.props;

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
                            accessor: "category_group_cd",
                            width : 100,
                        },
                        {
                            Header: "Descs",
                            accessor: "descs",
                            minWidth : 300
                        }
                      ]}
                    data={data}
                    defaultPageSize={5}
                    noDataText="No Category Group found"                 
                />
            </FuseAnimate>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCategoryGroup    : Actions.getCategoryGroup,
        openNewDialog       : Actions.openNewDialog
    }, dispatch);
}

function mapStateToProps({categorygroup})
{
    return {
        data: categorygroup.section.categorygroup
    }
}
export default withReducer('categorygroup', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(CategoryGroup)));
