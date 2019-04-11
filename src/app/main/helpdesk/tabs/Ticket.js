import React, {Component} from 'react';
import {withStyles, Typography, Button, FormControlLabel, MenuItem, Radio, Grid, Icon, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton } from '@material-ui/core';
import Formsy, {addValidationRule} from 'formsy-react';
import {TextFieldFormsy, RadioGroupFormsy, SelectFormsy, FuseAnimateGroup} from '@fuse';
import VideoThumbnail from 'react-video-thumbnail';
import dbService from 'app/services/dbService';
import connect from 'react-redux/es/connect/connect';
import {withRouter, Redirect} from 'react-router-dom';
import * as Actions from 'app/store/actions';
import {bindActionCreators} from 'redux';

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

var formData = new FormData();
class Ticket extends Component {

    state = {
        canSubmit       : false,
        value           : 0,
        images          : [],
        intMedia        : 0,
        debtor          : [],
        levelno         : '',
        lotno           : [],
        category        : [],
        success         : false,
        validImageTypes : ['image/gif', 'image/jpeg', 'image/png']
    };
        
    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    getDataDebtor() {
        dbService.getDataDebtor()
        .then((data) => {
            this.setState({ 'debtor': data })
        })
        .catch(error => {
            console.log(error)
        });
    }

    getDataCategory() {
        dbService.getDataCategory('R')
        .then((data) => {
            this.setState({ 'category': data })
        })
        .catch(error => {
            console.log(error)
        });
    }

    handleChangeDebtor = (event) =>{
        const debtor = event.target.value
        dbService.getDataLotno(debtor)
        .then((data) => {
            this.setState({ 'lotno': data })
        })
        .catch(error => {
            console.log(error)
        });
    }

    handleChangeLotno = (event) =>{
        console.log(event.target)
        const levelno = event.target.value
        this.setState({ 'levelno': levelno })
    }

    handleChangeType = (event) =>{
        const type = event.target.value
        dbService.getDataCategory(type)
        .then((data) => {
            this.setState({ 'category': data })
        })
        .catch(error => {
            console.log(error)
        });
    }

    handleAddMedia = (event) => {
        const files = event.target.files
        const length = files.length
        let images = []

        for(let i = 0; i < length; i++){
            const key = Math.floor(Math.random() * 1000) + 1
            images = [...images, {
                key   : key,
                url   : URL.createObjectURL(files[i]),
                files : files[i],
                name  : files[i].name,
                type  : files[i].type
            }]
        }

        this.setState({
            images   : this.state.images.concat(images),
            intMedia : this.state.intMedia + parseInt(length)
        })
    }

    handleDeleteMedia = (key) => {
        this.setState({
            images: this.state.images.filter(image => image.key !== key),
            intMedia : this.state.intMedia - 1
        })
    }

    onSubmit = (model) => {
        this.state.images.forEach((data, key) => {
            formData.append(key, data.files)
        })
        for ( var key in model ) {
            formData.append(key, model[key]);
        }

        dbService.saveTicket(formData)
        .then((data) => {
            this.props.showMessage({
                message: data,
                variant: 'success'
            });
            this.setState({ success: true })
        })
        .catch(error => {
            console.log(error)
        });
    };

    componentDidMount(){
        this.getDataDebtor()
        this.getDataCategory()
    }

    render()
    {
        const {classes, user} = this.props;
        const {images, intMedia, canSubmit, validImageTypes, debtor, lotno, levelno, category, success} = this.state;

        if (success) {
            return <Redirect to='/dashboards'/>
        }
        
        return (
            <div>
                <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}>
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
                        onChange={this.handleChangeType}
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
                        name="debtor"
                        label="Debtor"
                        variant="outlined"
                        value=''
                        onChange={this.handleChangeDebtor}
                        required>
                        <MenuItem value=''></MenuItem>
                        {debtor.map((data, i) => (
                            <MenuItem value={data.debtor_acct} key={i}>{data.name} ({data.debtor_acct})</MenuItem>                            
                        ))}
                    </SelectFormsy>

                    <TextFieldFormsy
                        className="my-16"
                        type="text"
                        name="requestBy"
                        label="Request By"
                        variant="outlined"
                        value={user.data.displayName}
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
                                placeholder='Input Hanphone Number'
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
                        <MenuItem value="byphone">By Phone</MenuItem>
                    </SelectFormsy>

                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <SelectFormsy
                                className="my-16 w-full"
                                name="lotno"
                                onChange={this.handleChangeLotno}
                                label={lotno.length === 0 ? 'No Have Lot No' : 'Lot No'}
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

                    <SelectFormsy
                        className="my-16"
                        name="category"
                        label="Category Problem / Request"
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

                    <input
                        className="my-16 hidden"
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        name="user[]"
                        id="pictures"
                        onChange={this.handleAddMedia}/>
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

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            showMessage        : Actions.showMessage,
            hideMessage        : Actions.hideMessage
        },
        dispatch);
}

function mapStateToProps({auth})
{
    return {
        login: auth,
        user: auth.user
    }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Ticket)));
