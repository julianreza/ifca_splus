import React, {Component} from 'react';
import {Typography, Button, FormControlLabel, MenuItem, Radio, Grid, Icon, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton } from '@material-ui/core';
import Formsy, {addValidationRule} from 'formsy-react';
import {TextFieldFormsy, RadioGroupFormsy, SelectFormsy, FuseAnimateGroup} from '@fuse';
import VideoThumbnail from 'react-video-thumbnail';

class Application extends Component {

    state = {
        canSubmit       : false,
    };

    render()
    {
        const {classes} = this.props;
        const {canSubmit} = this.state;

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
                        name="applicationType"
                        label="Application Type"
                        value="A"
                        required>
                        <FormControlLabel value="A" control={<Radio color="secondary"/>} label="Access"/>
                        <FormControlLabel value="P" control={<Radio color="secondary"/>} label="Parking"/>
                        <FormControlLabel value="T" control={<Radio color="secondary"/>} label="Telephone"/>
                    </RadioGroupFormsy>

                    <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="name"
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
                        className="my-16 w-full"
                        name="companyName"
                        label="Company Name"
                        required
                        value="test1"
                        variant="outlined">
                        <MenuItem value="test1">Test 1</MenuItem>
                        <MenuItem value="test2">Test 2</MenuItem>
                        <MenuItem value="test3">Test 3</MenuItem>
                    </SelectFormsy>

                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <SelectFormsy
                                className="my-16 w-full"
                                name="codeh"
                                label="Lot No"
                                required
                                value="1"
                                variant="outlined">
                                <MenuItem value="1">Lantai 1</MenuItem>
                                <MenuItem value="2">Lantai 2</MenuItem>
                                <MenuItem value="3">Lantai 3</MenuItem>
                            </SelectFormsy>
                        </Grid>
                        <Grid item xs={6}>
                            <TextFieldFormsy
                                className="my-16"
                                label="Floor"
                                type="number"
                                name="floor"
                                variant="outlined"
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
                        name="reason"
                        label="Reason"
                        variant="outlined"
                        value="test1"
                        required>
                        <MenuItem value="test1">Test 1</MenuItem>
                        <MenuItem value="test2">Test 2</MenuItem>
                        <MenuItem value="test3">Test 3</MenuItem>
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

export default Application;