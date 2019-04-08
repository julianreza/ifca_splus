import React, {Component} from 'react';
import {FusePageCarded} from '@fuse';
import {withStyles, Typography, List, ListItem, Tab, Tabs, Card, CardContent, CardHeader } from '@material-ui/core';
import {isBrowser, isMobile} from "react-device-detect";

let styles = theme => ({});

if (isBrowser){
    styles = theme => ({
        layoutRoot: {},
        card: {
            minWidth: '100%',
            marginTop: -30,
            marginBottom: 20,
        }
    });
}
else if(isMobile){
    styles = theme => ({
        layoutRoot: {},
        card: {
            minWidth: '119%',
            marginLeft: -30,
            marginTop: -30,
            marginBottom: 20,
        },
    });
}

class Billing extends Component {

    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render()
    {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="p-24"><h1>Billing Info</h1></div>
                }
                contentToolbar={
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        textColor="primary"
                        variant="fullWidth"
                        scrollButtons="off"
                        className="w-full h-64"
                    >
                        <Tab className="h-64" label="Due"/>
                        <Tab className="h-64" label="Current"/>
                    </Tabs>
                }
                content={
                    <div className="p-24">
                        {value === 0 &&
                        (
                            <List component="nav">
                                <ListItem>
                                    <Card className={classes.card}>
                                        <CardHeader
                                            subheader={
                                                <Typography align='left'>
                                                    PT. Arha Karya Mandiri
                                                </Typography>
                                            }
                                        />
                                        <CardContent>
                                            <Typography variant="h6">
                                              PT. Arha Karya Mandiri
                                            </Typography>
                                            <Typography component="p">Doc Date 2018-11-19</Typography>
                                        </CardContent>
                                    </Card>
                                </ListItem>
                                <ListItem>
                                    <Card className={classes.card}>
                                        <CardHeader
                                            subheader="IFCA Tower Office"
                                        />
                                        <CardContent>
                                            <Typography component="p">
                                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ListItem>
                                <ListItem>
                                    <Card className={classes.card}>
                                        <CardHeader
                                            subheader="IFCA Tower Office"
                                        />
                                        <CardContent>
                                            <Typography component="p">
                                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ListItem>
                                <ListItem>
                                    <Card className={classes.card}>
                                        <CardHeader
                                            subheader="IFCA Tower Office"
                                        />
                                        <CardContent>
                                            <Typography component="p">
                                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ListItem>
                            </List>
                        )}
                        {value === 1 && (
                            <List component="nav">
                                <h1>test</h1>
                            </List>
                        )}
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(Billing);