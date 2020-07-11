import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    MARK_NOTIFICATIONS_READ,
    MARK_NOTIFICATION_READ
} from '../types';

import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI });

    axios.post('/login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });

            //redirect to home page
            history.push('/home');
        })
        .catch((err) => {
            if (err.response) {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            } else {
                dispatch({
                    type: SET_ERRORS,
                    payload: {
                        email : 'connection error',
                        password: 'connection error'
                    }
                })
            }
        });
};

export const signUpUser = (newUserData, history) => (dispatch) => {

    dispatch({ type: LOADING_UI });

    axios.post('/signup', newUserData)
        .then((res) => {
            // console.log('signup data', res.data);
            setAuthorizationHeader(res.data.tokenId);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });

            //redirect to home page
            history.push('/home');
        })
        .catch((err) => {
            if (err.response) {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            } else {
                dispatch({
                    type: SET_ERRORS,
                    payload: {
                        email : 'connection error',
                        handle: 'connection error',
                        password: 'connection error'
                    }
                })
            }
        });
};

export const logOutUser = () => (dispatch) => {
    // console.log('logOutUser dispatched');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {

    // before we try to get the data we
    // dispatch an action with the type LOADING_USER
    dispatch({ type: LOADING_USER });

    axios.get('/user')
        .then(res => {
            // if success we need to dispatch an action
            // of type set_user and this action takes a payload
            // a payload is data we send to reducer to handle
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch((err) => {
            // console.log('err getUserData()', err);
            dispatch({
                type: SET_UNAUTHENTICATED
            })
        })
};

export const uploadUserImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => 
            console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });

    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData())
        })
        .catch(err => console.log(err));
};

export const markNotificationsRead = (notificationsIds) => dispatch => {
    axios
        .post('/notifications', notificationsIds)
        .then((res) => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .catch((err) => console.log(err))
}

export const markNotificationRead = (notificationId) => dispatch => {
    axios
        .post(`/notification/${notificationId}`)
        .then((res) => {
            dispatch({
                type: MARK_NOTIFICATION_READ,
                payload: notificationId
            })
        })
        .catch((err) => console.log(err))
}

// helper method
const setAuthorizationHeader = (token) => {
    const tokenToSet = `Bearer ${token}`;
    localStorage.setItem('token', tokenToSet);
    // add token to axios Authorization Header so all our calls with have the token
    // even for unprotected routes which is not a problem
    axios.defaults.headers.common['Authorization'] = tokenToSet;
};