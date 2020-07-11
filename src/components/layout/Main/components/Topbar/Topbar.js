// React
import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Redux
import { useDispatch, connect } from 'react-redux';
import { logOutUser } from '../../../../../redux/actions/userActions';

// MUI
import makeStyles from '@material-ui/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

// MUI ICONS
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Components
import PostTimeline from '../../../../timeline/PostTimeline';
import Notifications from '../../../Notifications';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    // marginLeft: theme.spacing(1)
  },
  topBarIconColor: {
    color: '#fff'
  }
}));


const Topbar = props => {
  const { className, onSidebarOpen, authenticated, loading } = props;

  const classes = useStyles();

  const dispatch = useDispatch();
  
  return (
    <AppBar
      // {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <div className="TopBarHeader">
            <h2>History Cards</h2>
          </div>
        </RouterLink>

        <div className={classes.flexGrow} />

        {authenticated && !loading ? (
          <Fragment>
              <PostTimeline />
            {/* Notifications Icon */}
            <Notifications />
            <Hidden mdDown>
            
              {/* Sign Out Icon */}
              <IconButton
                onClick={() => dispatch(logOutUser())}
                color="inherit"
              >
                <ExitToAppIcon className={classes.topBarIconColor} />
              </IconButton>
            </Hidden>
          </Fragment>
        ) : (
            null
          )
        }

        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>

      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  authenticated: PropTypes.bool.isRequired,
  logOutUser: PropTypes.func
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  loading: state.UI.loading
})

const mapDispatchToProps = { logOutUser };

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);