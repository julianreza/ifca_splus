import React, { Component } from 'react';
import { withStyles, AppBar, Card, Icon, IconButton, Tab, Tabs, Typography, Grid, CardHeader, CardContent, List, ListItem, ListItemText, Avatar, ListItemSecondaryAction } from '@material-ui/core';
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
            { id: 'C', nama: 'Confirmed', colors: '#87CEFA', icons: 'offline_pin', messages: 'Your Ticket Has Been Confirmed', wonumbs: '#WO8498121' },
            { id: 'C', nama: 'Confirmed', colors: '#87CEFA', icons: 'offline_pin', messages: 'Your Ticket Has Been Confirmed', wonumbs: '#WO8498121' },
            { id: 'C', nama: 'Confirmed', colors: '#87CEFA', icons: 'offline_pin', messages: 'Your Ticket Has Been Confirmed', wonumbs: '#WO8498121' },
            { id: 'C', nama: 'Confirmed', colors: '#87CEFA', icons: 'offline_pin', messages: 'Your Ticket Has Been Confirmed', wonumbs: '#WO8498121' },
            { id: 'C', nama: 'Confirmed', colors: '#87CEFA', icons: 'offline_pin', messages: 'Your Ticket Has Been Confirmed', wonumbs: '#WO8498121' },
            { id: 'C', nama: 'Confirmed', colors: '#87CEFA', icons: 'offline_pin', messages: 'Your Ticket Has Been Confirmed', wonumbs: '#WO8498121' },
        ]
        const { tabIndex } = this.state;
        const dataWithColors = data.datasets[tabIndex].map(obj => ({
            ...obj,
            borderColor: theme.palette.secondary.main
        }));
        return (
            <Card className="w-full rounded-8 shadow-md md:w-full">
                <CardHeader
                    title="Recent Activities"
                    subheader="One Month"/>
                <div className='h-256 overflow-auto'>
                    <List>
                    {statuss.map((data, i) => (
                        <ListItem key={i+1}>
                            <Avatar style={{backgroundColor: data.colors}}>
                                <Icon>{data.icons}</Icon>
                            </Avatar>
                            <ListItemText
                                primary={
                                    <Typography variant='title'>{data.nama}</Typography>
                                }
                                secondary={[
                                    <Typography variant='body1'>{data.messages}</Typography>,
                                    <Typography variant='caption'>4 Hour Ago</Typography>
                                ]}
                                />
                        </ListItem>
                    ))}
                    </List>
                </div>
            </Card>
        );
    }
}

export default withStyles(null, { withTheme: true })(Widget8);
