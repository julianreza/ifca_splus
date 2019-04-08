import React, {Component} from 'react';
import {FuseAnimate} from '@fuse';
import classNames from 'classnames';
import {withStyles, Typography, GridList, GridListTile, GridListTileBar} from '@material-ui/core';
import {Link} from 'react-router-dom';

const styles = theme => ({
    body    : {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
});


class Project extends Component {

    state = {
        value: 0
    };

    clickProject = () => {
        console.log('wowo')
    }

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.body, "justify-center h-full")}>
                <div className="text-center mb-16 mt-16">
                    <FuseAnimate animation="transition.expandIn">
                        <img className="w-128 sm:w-256" src="assets/images/logos/login.png" alt="logo"/>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                        <Typography color="inherit" className="font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                            Choose Projects
                        </Typography>
                    </FuseAnimate>
                </div>
                <div className='mb-8'>
                <FuseAnimate animation="transition.expandIn">
                    <GridList className='justify-center flex flex-warp' spacing={8} cols={0}>
                        <GridListTile
                            onClick={this.clickProject}
                            component={Link} to="/dashboards"
                            classes={{
                                root: "w-256 cursor-pointer hover:bg-blue rounded-lg",
                                tile: "rounded-lg"
                            }}
                            className={
                                classNames(
                                    classes.productImageItem)
                            }>
                            <img src='http://35.198.219.220:2121/ifca_splus/img/PlProject/IFCAApartement.jpg' className="h-full"/>
                            <GridListTileBar
                                title='IFCA Apartement & Resident'/>
                        </GridListTile>
                        <GridListTile
                            classes={{
                                root: "w-256 cursor-pointer hover:bg-blue rounded-lg",
                                tile: "rounded-lg"
                            }}
                            className={
                                classNames(
                                    classes.productImageItem)
                            }>>
                            <img src='http://35.198.219.220:2121/ifca_splus/img/PlProject/IFCATower.jpg' className="h-full"/>
                            <GridListTileBar
                                title='IFCA Tower Office'
                            />
                        </GridListTile>
                        <GridListTile
                            classes={{
                                root: "w-256 cursor-pointer hover:bg-blue rounded-lg",
                                tile: "rounded-lg"
                            }}
                            className={
                                classNames(
                                    classes.productImageItem)
                            }>>
                            <img src='http://35.198.219.220:2121/ifca_splus/img/PlProject/IFCAMall.jpg' className="h-full"/>
                            <GridListTileBar
                                title='IFCA Mall'
                            />
                        </GridListTile>
                    </GridList>
                </FuseAnimate>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Project);