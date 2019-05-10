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

class ComplainSource extends Component {

    componentDidMount()
    {
        this.props.getComplainSource();
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
                            Header: () => <Typography className='m-16'>No</Typography>,
                            width : 50,
                            className : "font-bold h-64 justify-center",
                            Cell: (row) => <div>{row.index+1}.</div>
                        },
                        {
                            Header: "Code",
                            accessor: "complain_source",
                            width : 100,
                        },
                        {
                            Header: "Descs",
                            accessor: "descs",
                            minWidth : 300
                        },
                    ]}
                    data={data}
                    defaultPageSize={5}
                    noDataText="No Compalin Source found" 
                />
            </FuseAnimate>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getComplainSource   : Actions.getComplainSource,
        openNewDialog       : Actions.openNewDialog
    }, dispatch);
}

function mapStateToProps({complainsource})
{
    return {
        data: complainsource.section.complainsource
    }
}
export default withReducer('complainsource', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(ComplainSource)));
