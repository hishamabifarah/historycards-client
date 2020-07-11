import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

// dayjs
import dayjs from 'dayjs';

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    ...theme.spreadableStyles,

    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
      },
      commentData: {
        marginLeft: 20
      }
    });

class Cards extends Component {

    render() {
    
        const { cards, classes } = this.props;
        // console.log('cards', cards);
        return (

      
            <Grid container>
                {cards.map((card) =>{
                    const { body , createdAt , imageUrl , userHandle} = card;
                    return (
                        <Fragment key={createdAt}>
                              <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src = {imageUrl} alt = "comment" className = {classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className = {classes.commentData}>
                                            <Typography 
                                                variant = "h5" 
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                 color="primary">
                                                {userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className = {classes.invisibleSeperator}/>
                                            <Typography variant="body1">
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>    
                            <hr className = {classes.visibleSeperator}/>
                        </Fragment>
                   
                    )
                })}
            </Grid>
        )
    }
}

Cards.propTypes = {
    cards: PropTypes.array.isRequired
}

export default withStyles (styles) (Cards)