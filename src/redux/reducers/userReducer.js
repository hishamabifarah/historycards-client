import {
    SET_USER,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    LOADING_USER,
    LIKE_TIMELINE,
    UNLIKE_TIMELINE,
    MARK_NOTIFICATIONS_READ,
    MARK_NOTIFICATION_READ,
    FAVORITE_TIMELINE,
    UNFAVORITE_TIMELINE
} from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    loading: false,
    likes: [],
    favorites : [],
    notifications: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };

        case SET_UNAUTHENTICATED:
            return initialState;

        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };

        case LIKE_TIMELINE:
            return {
                ...state,
                // spread the likes and add a new one on like
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        timelineId: action.payload.timelineId
                    }
                ]
            };

        case FAVORITE_TIMELINE:
            return {
                ...state,
                favorites:[
                    ...state.favorites,
                    {
                        userHandle: state.credentials.handle,
                        timelineId: action.payload.timelineId
                    }
                ]
            } 

        case UNFAVORITE_TIMELINE:
                return {
                    ...state,
                    favorites: state.favorites.filter((favorite) => favorite.timelineId !== action.payload.timelineId)
                }

        case UNLIKE_TIMELINE:
            return {
                ...state,
                likes: state.likes.filter((like) => like.timelineId !== action.payload.timelineId)
            }

        case LOADING_USER:
            return {
                ...state,
                loading: true
            };

        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach((notification) => (notification.read = true));
            return { ...state };

        case MARK_NOTIFICATION_READ:
            let index = state.notifications.findIndex((notification) => notification.notificationId === action.payload);

            state.notifications[index].read = true;

            return { ...state };

        default:
            return state;
    }
}