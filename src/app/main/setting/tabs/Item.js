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

class Item extends Component {

    componentDidMount()
    {
        this.props.getItem();
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
                            accessor: "item_cd",
                            width : 70,
                        },
                        {
                            Header: "Descs",
                            accessor: "descs",
                            minWidth : 300,
                        },
                        {
                            Header: "Trx Type",
                            accessor: "trx_type",
                            width : 70,
                        },
                        {
                            Header: "Tax Code",
                            accessor: "tax_cd",
                            width : 70,
                        },
                        {
                            Header: "Currency",
                            accessor: "currency_cd",
                            width : 70,
                        },
                        {
                            Header: "Unit Price",
                            accessor: "charge_amt",
                            width : 100,
                            
                        },
                    ]}
                    data={data}
                    defaultPageSize={5}
                    noDataText="No Item found" 
                />
            </FuseAnimate>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getItem         : Actions.getItem,
        openNewDialog   : Actions.openNewDialog
    }, dispatch);
}

function mapStateToProps({item})
{
    return {
        data: item.section.item
    }
}
export default withReducer('item', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Item)));
