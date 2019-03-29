import React, { Component } from "react";
import Slider from "react-slick";
import {withStyles, Card, CardContent, CardHeader, Typography} from '@material-ui/core';
import dbService from 'app/services/dbService';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Widget2 extends Component {

  state = {
    NaP:[]
  };

  // GetData = () => {
    
  // };

  componentDidMount(){
    dbService.getDataNaP()
    .then((data) => {
      this.setState({'NaP' : data})
    })
    .catch(error => {
      console.log(error)
    });
  }

  render() {
    const {NaP } = this.state;
    const { classes } = this.props;
    console.log(NaP)
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      centerPadding:'70px',
      className: "center",
      centerMode: true,
    };

    return (
      <Card>
        <CardHeader 
        title="News and Promo"
        />
        <CardContent>
          <Slider {...settings}>
            {
               NaP.map(function (data, i) {
                  return <Card key={i}>
                    <CardHeader 
                      subheader={data.descs}
                    />
                    <CardContent>
                        <img src={data.picture} style={{height:200, alignItems:'center'}}/>
                    </CardContent>
                  </Card>
               })
            }
          </Slider>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(null, {withTheme: true})(Widget2);
