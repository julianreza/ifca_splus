import React from 'react';
import {AppBar, MuiThemeProvider, Toolbar, Typography} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';

const FooterLayout1 = ({classes, footerTheme}) => {

    return (
        <MuiThemeProvider theme={footerTheme}>
            <AppBar id="fuse-footer" className="relative z-10" color="default">
                <Toolbar className="px-16 py-0 flex items-center">
                    <Typography>
                    2018  &copy; Copyright <a href="http://35.198.219.220:2121/ifca_splus_v2" rel="noopener noreferrer" target="_blank">PT. IFCA Property365</a>. All rights reserved
                    </Typography>
                </Toolbar>
            </AppBar>
        </MuiThemeProvider>
    );
};

function mapStateToProps({fuse})
{
    return {
        footerTheme: fuse.settings.footerTheme
    }
}

export default connect(mapStateToProps)(FooterLayout1);
