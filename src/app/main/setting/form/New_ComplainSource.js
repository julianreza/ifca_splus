import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, DialogActions, DialogContent, Typography, Toolbar, AppBar, FormControlLabel, Radio, MenuItem} from '@material-ui/core';
import Formsy, {addValidationRule} from 'formsy-react';
import {TextFieldFormsy, RadioGroupFormsy, SelectFormsy} from '@fuse';
import * as Actions from 'app/store/actions';
import {bindActionCreators} from 'redux';
import { red } from '@material-ui/core/colors';

class New_ComplainSource extends Component {

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
                            Add Complain Source
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
                        <TextFieldFormsy
                            className="my-16"
                            type="text"
                            name="complainCode"
                            label="Complain Code"
                            variant="outlined"
                            required
                            fullWidth/>
                        <TextFieldFormsy
                            className="my-16"
                            type="text"
                            name="descs"
                            label="Description"
                            variant="outlined"
                            required
                            fullWidth/>
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

export default connect(null, mapDispatchToProps)(New_ComplainSource);
