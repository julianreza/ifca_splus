import React, { Component } from 'react';
import { withStyles, MuiThemeProvider, Typography, Grid } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { Line } from 'react-chartjs-2';
import Slider from "react-slick";
import _ from '@lodash';
import connect from 'react-redux/es/connect/connect';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const styles = theme => ({
    root: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
    }
});

class Widget1 extends Component {

    state = {
        dataset: '2017'
    };

    setDataSet = (dataset) => {
        this.setState({ dataset });
    };

    render() {
        const { classes, mainThemeDark, data: dataRaw, theme } = this.props;
        const { dataset } = this.state;
        const data = _.merge({}, dataRaw);
        const dataWithColors = data.datasets[dataset].map(obj => ({
            ...obj,
            borderColor: theme.palette.secondary.main,
            backgroundColor: theme.palette.secondary.main,
            pointBackgroundColor: theme.palette.secondary.dark,
            pointHoverBackgroundColor: theme.palette.secondary.main,
            pointBorderColor: theme.palette.secondary.contrastText,
            pointHoverBorderColor: theme.palette.secondary.contrastText
        }));
        const settings = {
            dots: true,
            fade: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            centerPadding: '70px',
            className: "center",
            centerMode: true,
            adaptiveHeight: true,
            swipeToSlide: true,
        }

        return (
            <MuiThemeProvider theme={mainThemeDark}>
                <div className={classes.root}>
                    <div className="container relative p-16 sm:p-24 flex flex-row justify-between items-center">

                        <FuseAnimate delay={100}>
                            <div className="flex-col">
                                <Typography className="h2">IFCA CSM</Typography>
                                <Typography className="h5" color="textSecondary">IFCA Property365 for Customers</Typography>
                            </div>
                        </FuseAnimate>

                    </div>
                    <div className="container relative h-250 sm:h-256 pb-16">
                        <Slider {...settings}>
                        <Grid item className="container mx-auto px-4">
                            {/* <img src={require('../../../../images/hasil1.jpg')} alt="noimage" className="sm:w-3/4 lg:w-3/4 lg:object-center"/> */}
                        </Grid>
                        </Slider>
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
