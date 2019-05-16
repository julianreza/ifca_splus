import React, {Component} from 'react';
import {withStyles, Typography, Button, FormControlLabel, MenuItem, Radio, Grid, Icon, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton } from '@material-ui/core';
import Formsy, {addValidationRule} from 'formsy-react';
import {TextFieldFormsy, RadioGroupFormsy, SelectFormsy, FuseAnimateGroup} from '@fuse';
import dbService from 'app/services/dbService';
import {bindActionCreators} from 'redux';
import {Redirect, withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../store/actions';

const styles = theme => ({});

var formData = new FormData();
class Application extends Component {

    state = {
        canSubmit       : false,
        levelno         : '',
    };

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    handleChangeLotno = (event) =>{
        const levelno = event.target.value
        this.setState({ 'levelno': levelno })
    }

    onSubmit = (model) => {
        for ( var key in model ) {
            formData.append(key, model[key]);
        }
        this.props.saveTicket(formData)
    };

    render()
    {
        const {debtor, lotno, category, getLotNo, getCategory} = this.props;
        const {canSubmit, levelno} = this.state;

        return (
            <div>
                <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                >
                    <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    encType="multipart/form-data"
                    className="flex flex-col justify-center">

                    <RadioGroupFormsy
                        className="my-16"
                        name="ticketType"
                        label="Application Type"
                        value="A"
                        onChange={(e) => {getCategory(e.target.value)}}
                        row
                        required>
                        <FormControlLabel value="A" control={<Radio color="secondary"/>} label="Access"/>
                        <FormControlLabel value="P" control={<Radio color="secondary"/>} label="Parking"/>
                        <FormControlLabel value="T" control={<Radio color="secondary"/>} label="Telephone"/>
                    </RadioGroupFormsy>

                    <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="requestBy"
                        label="Name"
                        variant="outlined"
                        required
                        fullWidth/>

                    <Grid container spacing={8}>
                        <Grid item xs='auto'>
                            <SelectFormsy
                                className="my-16"
                                name="codeh"
                                label=""
                                value="62"
                                variant="outlined">
                                <MenuItem value="62">
                                    <em>+62</em>
                                </MenuItem>
                            </SelectFormsy>
                        </Grid>
                        <Grid item xs>
                            <TextFieldFormsy
                                className="my-16"
                                label="Contact No"
                                type="number"
                                name="contactNo"
                                variant="outlined"
                                required
                                fullWidth/>
                        </Grid>
                    </Grid>

                    <SelectFormsy
                        className="my-16"
                        name="debtor"
                        label="Company Name"
                        variant="outlined"
                        value=''
                        onChange={(e) => {getLotNo(e.target.value)}}
                        required>
                        <MenuItem value=''></MenuItem>
                        {debtor.map((data, i) => (
                            <MenuItem value={data.debtor_acct} key={i}>{data.name} ({data.debtor_acct})</MenuItem>                            
                        ))}
                    </SelectFormsy>

                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <SelectFormsy
                                className="my-16 w-full"
                                name="lotno"
                                onChange={this.handleChangeLotno}
                                label={!lotno ? 'No Have Lot No' : 'Lot No'}
                                value=""
                                variant="outlined">
                                <MenuItem value=''></MenuItem>
                                {lotno.map((data, i) => (
                                    <MenuItem value={data.lot_no} key={i}>{data.lot_no}</MenuItem>
                                ))}
                            </SelectFormsy>
                        </Grid>
                        <Grid item xs={6}>
                            <TextFieldFormsy
                                className="my-16"
                                label="Floor"
                                type="text"
                                name="floor"
                                variant="outlined"
                                value={levelno}
                                disabled
                                fullWidth/>
                        </Grid>
                    </Grid>

                    <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="location"
                        label="Location of Problem / Request"
                        placeholder="e.g. in The Meeting Room or Men's Room"
                        variant="outlined"
                        required
                        fullWidth/>

                    <SelectFormsy
                        className="my-16"
                        name="category"
                        label="Reason"
                        variant="outlined"
                        value=''
                        required>
                        <MenuItem value=''></MenuItem>
                        {category.map((data, i) => (
                            <MenuItem value={data.category_cd} key={i}>{data.descs}</MenuItem>                            
                        ))}
                    </SelectFormsy>

                    <TextFieldFormsy
                        className="my-16"
                        type="text"
                        multiline
                        rows="3"
                        cols="50"
                        name="workRequested"
                        label="Work Requested"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth/>

                    <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="location"
                        label="Location of Problem / Request"
                        placeholder="e.g. in The Meeting Room or Men's Room"
                        variant="outlined"
                        required
                        fullWidth/>

                    <TextFieldFormsy
                        className="my-16 hidden"
                        type="text"
                        name="customerType"
                        variant="outlined"
                        value="T"
                        fullWidth/>
                    
                    <TextFieldFormsy
                        className="my-16 hidden"
                        type="text"
                        name="complainSource"
                        variant="outlined"
                        value=""
                        fullWidth/>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-224 mx-auto mt-16"
                        aria-label="Reset"
                        disabled={!canSubmit}>
                        SAVE TICKET
                    </Button>

                </Formsy>
                </FuseAnimateGroup>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            getLotNo    : Actions.getLotNo,
            getCategory : Actions.getCategory,
            saveTicket  : Actions.saveTicket
        },
        dispatch);
}

function mapStateToProps({helpdesk})
{
    return {
        debtor      : helpdesk.data.debtor,
        lotno       : helpdesk.data.lotno,
        category    : helpdesk.data.category
    }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Application)));