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

class Section extends Component {

    componentDidMount()
    {
        this.props.getSection();
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
                          Header: "Section Cd",
                          accessor: "section_cd",
                          maxWidth : 100
                        },
                        {
                          Header: "Descs",
                          accessor: "descs",
                          minWidth : 200
                        },
                        {
                          Header: "Audit Date",
                          accessor: "audit_date",
                          maxWidth : 200
                        }
                      ]}
                    data={data}
                    defaultPageSize={6}
                    showPageSizeOptions={false}
                    noDataText="No Section found"                 
                />
            </FuseAnimate>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getSection   : Actions.getSection,
        openNewDialog: Actions.openNewDialog
    }, dispatch);
}

function mapStateToProps({section})
{
    return {
        data: section.section.section
    }
}

export default withReducer('section', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Section)));
