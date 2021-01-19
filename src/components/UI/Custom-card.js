import React from "react";
// import Card from "react-bootstrap/Card";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./Custom-card.css";

const CustomCard = (props) => {
  return (
    // <Card style={{ width: "20rem" }} className="h-100">
    //   <Card.Img variant="top" src="./images/idsc_logo.png" />
    //   <Card.Body>
    //     <Card.Title>{props.CardTitle}</Card.Title>
    //     <Card.Text>{props.CardText}</Card.Text>
    //   </Card.Body>
    // </Card>
    <Card className="h-100">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.CardImg}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.CardTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.CardText}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" style={{ color: "var(--main-green)" }}>
          مزيد
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
