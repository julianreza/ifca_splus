import React, { Component } from "react";
import Slider from "react-slick";
import { withStyles, Card, CardContent, CardHeader, Typography, Grid } from '@material-ui/core';
import { isBrowser } from 'react-device-detect';
import dbService from 'app/services/dbService';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Widget2 extends Component {

  state = {
    NaP: []
  };

  componentDidMount() {
    dbService.getDataNaP()
      .then((data) => {
        this.setState({ 'NaP': data })
      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    const { NaP } = this.state;
    const { classes } = this.props;
    console.log(NaP)
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      centerPadding: '30px',
      className: "center",
      centerMode: true,
      adaptiveHeight: true,
      swipeToSlide: true,
      arrows: true,
      appendDots: dots => (
        <div
          style={{
            paddingRight: "50px",
            paddingBottom: "10px",
            marginTop: "20px",
          }}
        >
          <ul style={{ margin: "0px" }}> {dots} </ul>
        </div>
      ),
      customPaging: i => (
        <div
          style={{  
            width: "30px",
            color: "white",
            borderRadius: "200px",
            backgroundColor: "black"
          }}
        >
          {i + 1}
        </div>
      )
    };


    return (
      <Card className="shadow">
        <CardHeader
          title="News and Promo"
        />
        <CardContent className="container">
          <Slider {...settings}>
            {
              NaP.map(function (data, i) {
                return <div key={i}>
                  <Grid item xs={10} className="justify-center">
                    <img src={data.picture} alt="noimage" className="w-full" style={{ margin: "auto" }} />
                  </Grid>
                  <Typography style={{ paddingTop: 20 }} gutterBottom variant="h5" component="h2">
                    {data.descs}
                  </Typography>
                  <Typography component="p" className="text-justify" style={{ paddingBottom: 10 }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </Typography>
                </div>
              })
            }
          </Slider>
        </CardContent>
      </Card>

    );
  }
}

export default withStyles(null, { withTheme: true })(Widget2);
