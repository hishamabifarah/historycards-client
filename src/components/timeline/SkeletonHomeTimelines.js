import React from "react";
import Skeleton from "react-loading-skeleton";

// MUI 
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

const SkeletonHomeTimelines = () => {
    return (
        <div>
            <div style={{ margin: '15px' }}>
            </div>

            <div>
                <div className="list">
                    {Array(9)
                        .fill()
                        .map((item, index) => (
                            <Card key={index} >
                                <CardActionArea>
                                    <CardContent>
                                        <h4 className="card-title">
                                            <Skeleton circle={true} height={50} width={50} /> &nbsp;
                                             <Skeleton height={36} width={`80%`} />
                                        </h4>

                                        <Skeleton height={225} width={`100%`} />

                                        <Typography style={{ marginTop: '20px' }} variant="body2" color="textSecondary" component="p">
                                            <Skeleton count={6} duration={1} width={`100%`} />
                                        </Typography>

                                        <Divider style={{marginTop: '10px' , marginBottom: '10px'}} light />

                                        <Skeleton height={36} width={`100%`} />

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SkeletonHomeTimelines;