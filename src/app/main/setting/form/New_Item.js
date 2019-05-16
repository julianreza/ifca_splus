import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, DialogActions, DialogContent, Typography, Toolbar, AppBar, FormControlLabel, Radio, MenuItem} from '@material-ui/core';
import Formsy, {addValidationRule} from 'formsy-react';
import {TextFieldFormsy, RadioGroupFormsy, SelectFormsy} from '@fuse';
import * as Actions from 'app/store/actions';
import {bindActionCreators} from 'redux';
import { red } from '@material-ui/core/colors';

class New_Item extends Component {

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
                            Add Item
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
                            name="itemCd"
                            label="Item Code"
                            variant="outlined"
                            required
                            fullWidth/>
                        <RadioGroupFormsy
                            className="my-16"
                            name="icFlag"
                            label="IC Flag"
                            value="1"
                            row>
                            <FormControlLabel value="1" control={<Radio color="secondary"/>} label="Yes"/>
                            <FormControlLabel value="0" control={<Radio color="primary"/>} label="No"/>
                        </RadioGroupFormsy>
                        <TextFieldFormsy
                            className="my-16"
                            type="text"
                            name="descs"
                            label="Description"
                            variant="outlined"
                            required
                            fullWidth/>
                        <SelectFormsy
                            className="my-16"
                            name="trxType"
                            label="Trx Type"
                            variant="outlined"
                            value=''
                            required>
                            <MenuItem value=''></MenuItem>
                            <MenuItem value='test'>Test</MenuItem>
                        </SelectFormsy>
                        <SelectFormsy
                            className="my-16"
                            name="taxCd"
                            label="Tac Code"
                            variant="outlined"
                            value=''
                            required>
                            <MenuItem value=''></MenuItem>
                            <MenuItem value='test'>Test</MenuItem>
                        </SelectFormsy>
                        <SelectFormsy
                            className="my-16"
                            name="currency"
                            label="Currency"
                            variant="outlined"
                            value=''
                            required>
                            <MenuItem value=''></MenuItem>
                            <MenuItem value='test'>Test</MenuItem>
                        </SelectFormsy>
                        <TextFieldFormsy
                            className="my-16"
                            type="text"
                            name="unitPrice"
                            label="Unit Price"
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

export default connect(null, mapDispatchToProps)(New_Item);
