// errors reducer types
export const GET_ITMELINES_ERROR = "Error retrieving timelines, please try again";
export const GET_ITMELINE_ERROR = "Error retrieving timeline, please try again";

//user reducer types
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';
export const SET_USER = 'SET_USER';
export const LOADING_USER = 'LOADING_USER';
export const MARK_NOTIFICATIONS_READ = 'MARK_NOTIFICATIONS_READ';
export const MARK_NOTIFICATION_READ = 'MARK_NOTIFICATION_READ';

//UI reducer types
export const SET_ERRORS = 'SET_ERRORS';
export const LOADING_UI = 'LOADING_UI';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const LOADING_DATA = 'LOADING_DATA';
export const STOP_LOADING_UI = 'STOP_LOADING_UI';

//timelines data reducer types
export const SET_TIMELINES = 'SET_TIMELINES';
export const SET_TIMELINE = 'SET_TIMELINE';
export const LIKE_TIMELINE = 'LIKE_TIMELINE';
export const UNLIKE_TIMELINE = 'UNLIKE_TIMELINE';
export const FAVORITE_TIMELINE = 'FAVORITE_TIMELINE';
export const UNFAVORITE_TIMELINE = 'UNFAVORITE_TIMELINE';
export const DELETE_TIMELINE = 'DELETE_TIMELINE';
export const POST_TIMELINE = 'POST_TIMELINE';
export const SET_FAVORITES = 'SET_FAVORITES';
export const EDIT_TIMELINE = 'EDIT_TIMELINE';
export const EDIT_TIMELINE_ERROR = 'EDIT_TIMELINE_ERROR';
export const UPLOAD_IMAGE_TIMELINE = 'UPLOAD_IMAGE_TIMELINE';

// cards data reducer types
export const SUBMIT_COMMENT = 'SUBMIT_COMMENT';
export const DELETE_CARD = 'DELETE_CARD';
export const LIKE_TIMELINE_CARD = 'LIKE_TIMELINE_CARD';
export const DISLIKE_TIMELINE_CARD = 'DISLIKE_TIMELINE_CARD';
export const POST_CARD = 'POST_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const EDIT_CARD_ERROR = 'EDIT_CARD_ERROR';
export const UPLOAD_IMAGE_CARD = 'UPLOAD_IMAGE_CARD';

//data reducer types
export const SET_RATINGS = 'SET_RATINGS';
export const SET_RECENT_ACTIVITY = 'SET_RECENT_ACTIVITY';
export const SET_RECENT_ACTIVITY_ERROR = 'SET_RECENT_ACTIVITY_ERROR';