// React
import React  from "react";
import Skeleton from "react-loading-skeleton";

// MUI 
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const SkeletonActivities = () => {
  return (
    <div>
        <div className="list">
          {Array(9)
            .fill()
            .map((item, index) => (
              <Card key={index} style={{ marginTop: '20px' }} >
              <CardActionArea>
                <CardContent  style={{ padding:'2px' }}>
                <h4 className="card-title">
                <Skeleton circle={true} height={40} width={40} margin={`2px`} /> &nbsp;
                  <Skeleton height={36} width={`80%`} />
                </h4>
                </CardContent>
              </CardActionArea>
            </Card>
            ))}
        </div>
    </div>

    );
  };

export default SkeletonActivities;