import React, {Component} from 'react';
import {FuseAnimate} from '@fuse';
import classNames from 'classnames';
import {withStyles, Typography, GridList, GridListTile, GridListTileBar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import dbService from 'app/services/dbService';

const styles = theme => ({
    body    : {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
});


class Project extends Component {

    state = {
        project : []
    };

    getData = () => {
        dbService.getDataProject()
        .then((data) => {
            // console.log(data)
            this.setState({ 'project': data })
        })
        .catch(error => {
            console.log(error)
        });
    }

    clickProject = (data) =>{
        localStorage.setItem("dataproject", JSON.stringify({
            cons        : data.db_profile,
            project_no  : data.project_no,
            entity_cd   : data.entity_cd,
            project_name: data.project_descs
        }));
    }

    componentDidMount(){
        this.getData()
    }

    render()
    {
        const { classes } = this.props;
        const { project } = this.state;

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
                    {project.map((data, i) => (
                        <GridListTile
                            key={i}
                            component={Link} to="/dashboards"
                            onClick={()=>{this.clickProject(data)}}
                            classes={{
                                root: "w-256 cursor-pointer hover:bg-blue rounded-lg",
                                tile: "rounded-lg"
                            }}
                            className={
                                classNames(
                                    classes.productImageItem)
                            }>
                            <img src={data.picture_url} className="h-full"/>
                            <GridListTileBar
                                title={data.project_descs}/>
                        </GridListTile>
                    ))}
                    </GridList>
                </FuseAnimate>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Project);