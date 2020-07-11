import React, { Fragment } from "react";
import Skeleton from "react-loading-skeleton";

// MUI 
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const SkeletonCard = () => {
  return (
    <div>
      <Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card style={{ marginTop: '20px' }} >
              <CardActionArea>
                <CardContent>
                  <Skeleton duration={1} height={118} width={`100%`} />
                  <Typography gutterBottom variant="h5" component="h2">
                    <Skeleton duration={1} height={20} width={200} />
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <Skeleton count={6} duration={1} width={300} />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    <div style={{margin: '15px'}}>
      <Typography variant="h5" component="h2">
        <Skeleton duration={1} height={35} width={200} />
      </Typography>
    </div>

    <div>
        <div className="list">
          {Array(9)
            .fill()
            .map((item, index) => (
              <Card key={index} style={{ marginTop: '20px' }} >
              <CardActionArea>
                <CardContent>
                
                <h4 className="card-title">
                <Skeleton circle={true} height={50} width={50} /> &nbsp;
                  <Skeleton height={36} width={`80%`} />
                </h4>

                  <Typography gutterBottom variant="h5" component="h2">
                    <Skeleton duration={1} height={20} width={200} />
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <Skeleton count={5} duration={1} width={300} />
                  </Typography>

                </CardContent>
              </CardActionArea>
            </Card>
            ))}
        </div>
    </div>
    </div>
    );
  };

export default SkeletonCard;