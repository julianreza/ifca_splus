import React, {Component} from 'react';
import {withStyles, Typography, Button, FormControlLabel, MenuItem, Radio, Grid, Icon, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton } from '@material-ui/core';
import Formsy, {addValidationRule} from 'formsy-react';
import {TextFieldFormsy, RadioGroupFormsy, SelectFormsy, FuseAnimateGroup} from '@fuse';
import VideoThumbnail from 'react-video-thumbnail';

const styles = theme => ({
    productImageFeaturedStar: {
        position : 'absolute',
        top      : 0,
        right    : 0,
        fontSize : 50
    },
    productImageItem        : {
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
    }
});

class Ticket extends Component {

    state = {
        canSubmit       : false,
        value           : 0,
        images          : [],
        intMedia        : 0,
        validImageTypes : ['image/gif', 'image/jpeg', 'image/png']
    };

    handleAddMedia = (event) => {
        const files = event.target.files
        const length = files.length
        let images = []
        for(let i = 0; i < length; i++){
            images = [...images, {
                key : Math.floor(Math.random() * 1000) + 1,
                url : URL.createObjectURL(files[i]),
                name: files[i].name,
                type: files[i].type
            }]
        }
        this.setState({
            images: this.state.images.concat(images),
            intMedia : this.state.intMedia + parseInt(length)
        })

    }

    handleDeleteMedia = (key) => {
        let images = this.state.images

        for( let i = 0; i < images.length; i++){
            if ( images[i].key === key) {
                images.splice(i, 1);
            }
        }
        this.setState({
            images: images,
            intMedia : this.state.intMedia - 1
        })
    }

    render()
    {
        const {classes} = this.props;
        const {images, intMedia, canSubmit, validImageTypes} = this.state;

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
                        label="Ticket Type"
                        value="R"
                        required>
                        <FormControlLabel value="R" control={<Radio color="secondary"/>} label="Request"/>
                        <FormControlLabel value="C" control={<Radio color="secondary"/>} label="Complain"/>
                    </RadioGroupFormsy>

                    <RadioGroupFormsy
                        className="my-16"
                        name="customerType"
                        label="Customer Type"
                        value="C"
                        required>
                        <FormControlLabel value="C" control={<Radio color="secondary"/>} label="Customer"/>                                          
                        <FormControlLabel value="V" control={<Radio color="secondary"/>} label="Visitor"/>
                    </RadioGroupFormsy>

                    <SelectFormsy
                        className="my-16"
                        name="related"
                        label="Name"
                        variant="outlined"
                        value="hai"
                        required>
                        <MenuItem value="hai">Hai</MenuItem>
                        <MenuItem value="olivier">Olivier</MenuItem>
                        <MenuItem value="kevin">Kevin</MenuItem>
                    </SelectFormsy>

                    <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="requestBy"
                        label="Request By"
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
                        name="complainSource"
                        label="Complain Source"
                        variant="outlined"
                        value="email"
                        required
                        fullWidth>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="visit">Visit</MenuItem>
                        <MenuItem value="by phone">By Phone</MenuItem>
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

                    <SelectFormsy
                        className="my-16"
                        name="category"
                        label="Category Problem / Request"
                        variant="outlined"
                        value="hai"
                        required>
                        <MenuItem value="hai">Hai</MenuItem>
                        <MenuItem value="olivier">Olivier</MenuItem>
                        <MenuItem value="kevin">Kevin</MenuItem>
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

                    <input
                        className="my-16 hidden"
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        name="user[image]"
                        id="pictures"
                        onChange={this.handleAddMedia}
                        required/>
                    <div className='mb-48'>
                        <ListSubheader component="div" className="flex items-center pl-0 mb-24">
                            <label htmlFor="pictures">
                                <Button variant="contained" component="span">
                                    Select Media
                                </Button>
                            </label>
                            <Typography variant="subtitle1" color="textSecondary">&nbsp;&nbsp;{intMedia} Media</Typography>
                        </ListSubheader>
                        <GridList className="" spacing={8} cols={0}>
                            {images.map((media) => (
                                <GridListTile
                                    classes={{
                                        root: "flex flex-warp w-256",
                                        tile: "rounded-lg"
                                    }}
                                    key={media.key}>
                                    {validImageTypes.includes(media.type) ? 
                                    <img src={media.url} alt={media.name} className="h-full"/>:
                                    [<Icon className={classes.productImageFeaturedStar}>play_circle_filled_white</Icon>,
                                    <VideoThumbnail
                                        videoUrl={media.url}
                                        className="w-full" />]}

                                    <GridListTileBar
                                        title={media.name}
                                        actionIcon={
                                            <IconButton
                                                onClick={() => this.handleDeleteMedia(media.key)}>
                                                <Icon className="text-red opacity-10">delete_forever</Icon>
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>

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

export default withStyles(styles)(Ticket);
