// React
import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// MUI
import clsx from 'clsx';
import makeStyles from '@material-ui/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

// MUI ICONS
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';

// Components
import SidebarNav  from './components/SidebarNav';
import ProfileSidebar from './../../../../profile/ProfileSidebar';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 80,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0) // margin: 16px 0px;
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, handle } = props;
  const classes = useStyles();

  const pages = [
    {
      title: 'Home',
      href: '/home',
      icon: <HomeIcon />
    },
    {
      title: 'Favorites',
      href: `/favorites/${handle}`,
      icon: <FavoriteIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      onClick = {onClose}
      open={open}
      variant={variant}
    >
      <div
        // {...rest} caused Invalid value for prop `dispatch` on <div> tag. Either remove it from the element,
        //or pass a string or number value to keep it in the DOM. For details
        className={clsx(classes.root, className)}
      >
        <ProfileSidebar />

        <Divider className={classes.divider} />

        <SidebarNav
          className={classes.nav}
          pages={pages}
        />

      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  handle : PropTypes.string
};

const mapStateToProps = (state) => ({
  handle: state.user.credentials.handle
})

export default connect(mapStateToProps)(Sidebar);