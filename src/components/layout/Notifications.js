// React
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { markNotificationsRead, markNotificationRead } from '../../redux/actions/userActions';

// MUI 
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// MUI Icons
import NotificationIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import BookmarkIcon from '@material-ui/icons/Bookmark';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

class Notifications extends Component {
  state = {
    anchorEl: null
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handleItemMenuClicked = item => {
    this.props.markNotificationRead(item);
    this.setState({ anchorEl: null });
  }

  handleMarkAllRead = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter(n => !n.read)
      .map(n => n.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  }

  handleClose = (e) => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = (e) => {
    // let unreadNotificationsIds = this.props.notifications
    //   // .filter(n => !n.read)
    //   .filter(n => n.notificationId)
    //   // .map(n => n.notificationId);
    // this.props.markNotificationsRead(unreadNotificationsIds);
  };

  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    // Create notification icon
    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(n => n.read === false).length > 0
        ? (notificationsIcon = (
          <Badge
            badgeContent={notifications.filter(n => n.read === false).length}
            color="secondary"
          >
            <NotificationIcon />
          </Badge>
        ))
        : (notificationsIcon = <NotificationIcon />);
    } else {
      notificationsIcon = <NotificationIcon />;
    }

    // Create notification markup
    let NotificationMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map(n => {
          const verb = n.type === 'like' ? 'liked' : n.type === 'comment' ? 'added a card to' : 'favorited';
          const time = dayjs(n.createdAt).fromNow();
          const iconColor = n.read ? 'primary' : 'secondary';

          const icon =
            n.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : n.type === 'comment' ? (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
                  <BookmarkIcon color={iconColor} style={{ marginRight: 10 }} />
                )

          return (
            <MenuItem key={n.notificationId} onClick={(event) => this.handleItemMenuClicked(n.notificationId)}>
              {icon}
              <Typography style={{ color: 'black' }}
                component={Link}
                variant="body1"
                to={`/timelines/${n.timelineId}`}
              >
                {n.sender} {verb} your timeline
                <Typography variant="body2">
                  {time}
                </Typography>
              </Typography>
            </MenuItem>
          );
        })
      ) : (
          <MenuItem onClick={this.handleClose}>
            You have no notifications yet!
        </MenuItem>
        );

    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton style={{ color: '#fff' }}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {NotificationMarkup}

          {notifications && notifications.length > 0 && (notifications.filter(n => n.read === false).length > 0) &&
            <div style={{ marginLeft: '16px', marginRight: '16px', border: '1px solid darkgrey' }}>
              <MenuItem onClick={this.handleMarkAllRead} style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                Mark All as Read
              </MenuItem>
            </div>
          }
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  markNotificationRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  notifications: state.user.notifications
});

export default connect(mapStateToProps, { markNotificationsRead, markNotificationRead })(Notifications);