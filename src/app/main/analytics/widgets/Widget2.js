import React, { Component } from "react";
import Slider from "react-slick";
import { withStyles, Card, CardContent, CardHeader, Typography } from '@material-ui/core';
// import { shadows } from '@material-ui/system';
import dbService from 'app/services/dbService';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Widget2 extends Component {

  state = {
    NaP: []
  };

  // GetData = () => {

  // };

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
      centerPadding: '70px',
      className: "center",
      centerMode: true,
    };

    return (
      <Card className="shadow">
        <CardHeader
          title="News and Promo"
        />
        <CardContent>
          <Slider {...settings}>
            {
              NaP.map(function (data, i) {
                return <Card key={i} className="w-full rounded-8 shadow-none">
                  <CardContent>
                    <img src={data.picture} className="img-responsive" alt="noimage" />
                    <Typography style={{ paddingTop: 10 }} gutterBottom variant="h5" component="h2">
                      {data.descs}
                    </Typography>
                    <Typography component="p">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </Typography>
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

export default withStyles(null, { withTheme: true })(Widget2);
