import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, DialogActions, DialogContent, Typography, Toolbar, AppBar, FormControlLabel, Radio, MenuItem} from '@material-ui/core';
import Formsy, {addValidationRule} from 'formsy-react';
import {TextFieldFormsy, RadioGroupFormsy, SelectFormsy} from '@fuse';
import * as Actions from 'app/store/actions';
import {bindActionCreators} from 'redux';
import { red } from '@material-ui/core/colors';

class New_Assign extends Component {

    state = {
        canSubmit       : false,
    };

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    render()
    {
        const {closeDialog} = this.props;
        const {canSubmit, success} = this.state;
        return (
            <React.Fragment>
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full items-center justify-center">
                        <Typography variant="h6" color="inherit">
                            Add Asign
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className='w-auto lg:w-512 xl:w-512'>
                    <Formsy
                        onValidSubmit={this.onSubmit}
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}
                        ref={(form) => this.form = form}
                        encType="multipart/form-data"
                        className="flex flex-col justify-center">
                        <SelectFormsy
                            className="my-16"
                            name="user"
                            label="User"
                            variant="outlined"
                            value=''
                            required>
                            <MenuItem value=''></MenuItem>
                            <MenuItem value='test'>Test</MenuItem>
                        </SelectFormsy>
                        <SelectFormsy
                            className="my-16"
                            name="labour"
                            label="Labour"
                            variant="outlined"
                            value=''
                            required>
                            <MenuItem value=''></MenuItem>
                            <MenuItem value='test'>Test</MenuItem>
                        </SelectFormsy>
                    </Formsy>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        aria-label="Reset"
                        disabled={!canSubmit}>
                        Save Section
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        style={{backgroundColor: red[500]}}
                        aria-label="Reset"
                        onClick={closeDialog}>
                        Close
                    </Button>
                </DialogActions>
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            closeDialog: Actions.closeDialog
        },
        dispatch);
}

export default connect(null, mapDispatchToProps)(New_Assign);
