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

class CustomerService extends Component {

    componentDidMount()
    {
        this.props.getCustomerService();
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
                            expander: true,
                            width: 65,
                            Expander: ({ isExpanded, ...rest }) =>
                                <div>
                                {isExpanded
                                    ? <Icon>remove_circle_outline</Icon>
                                    : <Icon>control_point</Icon>}
                                </div>,
                            className : "justify-center",                            
                            style: {
                                cursor: "pointer",
                                fontSize: 25,
                                padding: "0",
                                userSelect: "none"
                            }
                        },
                        {
                            Header: () => <Typography className='m-16'>No</Typography>,
                            width : 50,
                            className : "font-bold h-64 justify-center",
                            Cell: (row) => <div>{row.index+1}.</div>
                        },
                        {
                            Header: "Code",
                            accessor: "service_cd",
                            maxWidth: 70,
                        },
                        {
                            Header: "Section",
                            accessor: "section_cd",
                            maxWidth: 70,
                        },
                        {
                            Header: "Category",
                            accessor: "category_cd",
                            maxWidth: 70,
                        },
                        {
                            Header: "Trx Type",
                            accessor: "trx_type",
                            maxWidth: 80,
                        },
                        {
                            Header: "Hours",
                            accessor: "service_day",
                            maxWidth: 50,
                        },
                        {
                            Header: "Descs",
                            accessor: "descs",
                        },
                        {
                            accessor: "tax_cd",
                            show : false
                        },
                        {
                            accessor: "currency_cd",
                            show : false
                        },
                        {
                            accessor: "labour_rate",
                            show : false
                        },
                    ]}
                    data={data}
                    defaultPageSize={6}
                    showPageSizeOptions={false}
                    noDataText="No Category Group found" 
                    SubComponent={(row) => (
                        <div className='p-16 font-bold'>
                            <table>
                                <tr>
                                    <td>Tax Code</td>
                                    <td>:</td>
                                    <td>{row.row.tax_cd}</td>
                                </tr>
                                <tr>
                                    <td>Currency Code</td>
                                    <td>:</td>
                                    <td>{row.row.currency_cd}</td>
                                </tr>
                                <tr>
                                    <td>Service Rate</td>
                                    <td>:</td>
                                    <td>{row.row.labour_rate}</td>
                                </tr>
                            </table>
                        </div>
                    )}
                />
            </FuseAnimate>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCustomerService  : Actions.getCustomerService,
        openNewDialog       : Actions.openNewDialog
    }, dispatch);
}

function mapStateToProps({customerservice})
{
    return {
        data: customerservice.section.customerservice
    }
}
export default withReducer('customerservice', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(CustomerService)));
