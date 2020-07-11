import React from 'react'
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const Copyright = () => {
  return (
    <div className = "copyright_container">
      <Typography variant="body2" color="textSecondary" align="center"
      style={{ marginTop: '20px' , marginBottom: '20px' }}>
        {'Copyright © '}
        <Link to='' color="inherit" href="https://history.cards">
          history.cards
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}

export default Copyright