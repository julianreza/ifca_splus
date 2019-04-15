import React, { Component } from 'react';
import { withStyles, MuiThemeProvider, Typography, Grid } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { Line } from 'react-chartjs-2';
import Slider from "react-slick";
import _ from '@lodash';
import connect from 'react-redux/es/connect/connect';
import dbService from 'app/services/dbService';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
    }
});

class Widget1 extends Component {

    state = {
        dataset     : '2017',
        dataproject : [],
        dataticket  : [],
        labels  : [],
    };

    setDataSet = (dataset) => {
        this.setState({ dataset });
    };

    getDataProject() {
        dbService.getData()
        .then((data) => {
            this.setState({ 'dataproject': data[2] })
        })
        .catch(error => {
            console.log(error)
        });
    }

    getDataTicketByMonth() {
        let dataraw = []
        let MonthName = []
        dbService.getDataTicketByMonth()
        .then((data) => {
            data.forEach(element => {
                dataraw[element.Month - 1] = element.count;
                MonthName.push(element.MonthName)
            });
            this.setState({
                dataticket: [{
                    fill    : 'start',
                    label   : 'Ticket',
                    data    : dataraw
                }],
                labels : MonthName
            })
        })
        .catch(error => {
            console.log(error)
        });
    }

    componentDidMount(){
        this.getDataProject()
        this.getDataTicketByMonth()
    }

    render() {
        const { classes, mainThemeDark, data, theme } = this.props;
        const { dataset, dataproject, dataticket, labels } = this.state;

        const dataWithColors = dataticket.map(obj => ({
            ...obj,
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.main,
            pointBackgroundColor: theme.palette.secondary.dark,
            pointHoverBackgroundColor: theme.palette.secondary.main,
            pointBorderColor: theme.palette.secondary.contrastText,
            pointHoverBorderColor: theme.palette.secondary.contrastText
        }));

        return (
            <MuiThemeProvider theme={mainThemeDark}>
                <div className={classes.root}>
                    <div className="container relative p-16 sm:p-24 flex flex-row justify-between items-center">

                        <FuseAnimate delay={100}>
                            <div className="flex-col">
                                <Typography className="h2">Ticket Per Month</Typography>
                                <Typography className="h5" color="textSecondary">{dataproject.project_name}</Typography>
                            </div>
                        </FuseAnimate>

                    </div>
                    <div className="container relative h-250 sm:h-256 pb-16">
                        <Line
                            data={{
                                labels: labels,
                                datasets: dataWithColors
                            }}
                            options={data.options}
                        />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps({ fuse }) {
    return {
        mainThemeDark: fuse.settings.mainThemeDark
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Widget1));
