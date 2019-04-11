import React, { Component } from 'react';
import { withStyles, AppBar, Card, Icon, IconButton, Tab, Tabs, Typography, Grid } from '@material-ui/core';
import { Line } from 'react-chartjs-2';



class Widget8 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            status: [
                { id: 'S', nama: 'Processed', color: 'red' },
                { id: 'A', nama: 'Confirm', color: 'blue' },
                { id: 'D', nama: 'Cancelled', color: 'green' },
            ]
        }
    }


    handleChange = (event, tabIndex) => {
        this.setState({ tabIndex });
    };

    handleChangeIndex = index => {
        this.setState({ tabIndex: index });
    };

    render() {
        const { data, theme } = this.props;
        const statuss = [
            { id: 'P', nama: 'Processed', colors: '#90EE90', icons: 'history', messages: 'Your Ticket Has Been Processed', wonumbs: '#WO12931' },
            { id: 'D', nama: 'Cancelled', colors: '#CD5C5C', icons: 'delete_forever', messages: 'Your Ticket Has Been Cancelled', wonumbs: '#WO945824' },
            { id: 'C', nama: 'Confirmed', colors: '#87CEFA', icons: 'offline_pin', messages: 'Your Ticket Has Been Confirmed', wonumbs: '#WO8498121' },
        ]
        const { tabIndex } = this.state;
        const dataWithColors = data.datasets[tabIndex].map(obj => ({
            ...obj,
            borderColor: theme.palette.secondary.main
        }));
        return (
            <Card className="w-full rounded-8 shadow-md md:w-full">
                {
                    statuss.map((data, i) => {
                        return <div key={i} className="relative p-16 pr-4 flex flex-row items-center justify-between">
                            <div className="static rounded-full h-48 w-48 flex items-center justify-center" style={{ backgroundColor: '#E6790D' }}>
                                <Icon>{data.icons}</Icon>
                            </div>
                            <div className="p-8 h-64 w-5/6 border-none">
                                <Typography style={{ color: data.colors }}>{data.nama} : {data.wonumbs}</Typography>
                                <Typography className="h6">{data.messages}</Typography>
                                <Typography variant="caption">at March 9 - 12:03 PM</Typography>
                            </div>
                        </div>
                    })
                }
            </Card>
        );
    }
}

export default withStyles(null, { withTheme: true })(Widget8);
