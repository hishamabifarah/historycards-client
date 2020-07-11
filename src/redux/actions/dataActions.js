import {
    SET_TIMELINES,
    SET_TIMELINE,
    POST_TIMELINE,
    EDIT_TIMELINE,
    EDIT_TIMELINE_ERROR,
    DELETE_TIMELINE,
    UPLOAD_IMAGE_TIMELINE,
    LIKE_TIMELINE,
    UNLIKE_TIMELINE,
    UNFAVORITE_TIMELINE,
    FAVORITE_TIMELINE,
    CLEAR_ERRORS,
    SET_ERRORS,
    LOADING_DATA,
    LOADING_UI,
    STOP_LOADING_UI,
    SET_RATINGS,
    LIKE_TIMELINE_CARD,
    DISLIKE_TIMELINE_CARD,
    UPLOAD_IMAGE_CARD,
    SET_RECENT_ACTIVITY,
    SET_RECENT_ACTIVITY_ERROR,
    EDIT_CARD,
    EDIT_CARD_ERROR,
    DELETE_CARD,
    POST_CARD,
    SET_FAVORITES
} from '../types';

import axios from 'axios';

/*============================
    TIMELINES DATA ACTIONS
==============================*/

export const getTimelines = (page) => dispatch => {
    dispatch({ type: LOADING_DATA });

    axios.get('/timelinesp/' + page)
        .then((res) => {
            dispatch({
                type: SET_TIMELINES,
                payload: res.data
            })
        })
        .catch((err) => {
            // console.log('getTimelines', err);
            dispatch({
                type: SET_TIMELINES,
                payload: null
            })
        })
}

// Get Single timeline with details
export const getTimeline = (timelineId, page) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    if (!page) {
        page = 1;
    }
    axios.get('/timelinep/' + timelineId + '/' + page)

        .then((res) => {
            //  console.log('getTimeline data' , JSON.stringify(res.data.cards, undefined ,2 ));
            dispatch({
                type: SET_TIMELINE,
                payload: res.data
            });
            // Don't dispatch stop loading ui here, cause there's another call
            // this will keep loader running until all data is set then we can read the props
            // dispatch({ type: STOP_LOADING_UI });
            dispatch(getTimelineRatings(timelineId));
        })
        .catch((err) => {
            // console.log('getTimeline: ', err);
            if(page === 1){
            dispatch({
                type: SET_TIMELINE,
                payload: null
            })
        }else{
            dispatch({
                type: SET_TIMELINE,
                payload: 'paginateError'
            })
        }
        dispatch({ type: STOP_LOADING_UI });
        })
}

// Post new Timeline
export const postTimeline = (newTimeline) => (dispatch) => {

    dispatch({ type: LOADING_UI });
    axios
        .post('/timeline', newTimeline)
        .then(res => {
            dispatch({
                type: POST_TIMELINE,
                payload: res.data.resTimeline
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            if(err.response){
                dispatch({ type: SET_ERRORS, payload: err.response.data });
            }else{
                dispatch({ type: SET_ERRORS, payload: err });
            }
        });
};

// Edit Timeline 
export const editTimelineDetails = (timelineId , timeline ) => (dispatch) => {

    return axios.post(`/timeline/${timelineId}/edit`, timeline)
        .then((res) => {
           return dispatch({
                type: EDIT_TIMELINE,
                payload: res.data.resTimeline
            }) 
        })
        .catch(err => {
            return dispatch({
                type: EDIT_TIMELINE_ERROR
            })
        });
};

// Delete Timeline
export const deleteTimeline = (timelineId) => dispatch => {
    axios.delete(`/timeline/${timelineId}`)
        .then(() => {
            dispatch({
                type: DELETE_TIMELINE,
                payload: timelineId
            })
        })
        .catch((err) => console.log(err));
}

// Favorite a timeline
export const favoriteTimeline = (timelineId) => dispatch => {
    axios.post(`/timeline/${timelineId}/favorite`)
        .then((res) => {
            dispatch({
                type: FAVORITE_TIMELINE,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
}

// Like a timeline
export const likeTimeline = (timelineId) => dispatch => {
    axios.get(`/timeline/${timelineId}/like`)
        .then((res) => {
            dispatch({
                type: LIKE_TIMELINE,
                payload: res.data 
            })
        })
        .catch((err) => console.log(err));
}

// Unlike a timeline
export const unlikeTimeline = (timelineId) => dispatch => {
    axios.get(`/timeline/${timelineId}/unlike`)
        .then((res) => {
            dispatch({
                type: UNLIKE_TIMELINE,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
}

// Unfavorite a timeline
export const unfavoriteTimeline = (timelineId) => dispatch => {
    axios.post(`/timeline/${timelineId}/unfavorite`)
        .then((res) => {
            // console.log(res.data);
            dispatch({
                type: UNFAVORITE_TIMELINE,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
}

export const getTimelineOld = (timelineId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get('/timeline/' + timelineId)

        .then((res) => {
            //  console.log('getTimeline data' , JSON.stringify(res.data.cards, undefined ,2 ));
            dispatch({
                type: SET_TIMELINE,
                payload: res.data
            });
            // Don't dispatch stop loading ui here, cause there's another call
            // this will keep loader running until all data is set then we can read the props
            // dispatch({ type: STOP_LOADING_UI });
            dispatch(getTimelineRatings(timelineId));
        })
        .catch((err) => {
            console.log('getTimeline: ', err);
        })
}

// Get latest activity
export const getLatestActivity = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/activity')
        .then((res) => {
            dispatch({
                type: SET_RECENT_ACTIVITY,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: SET_RECENT_ACTIVITY_ERROR,
                payload: []
            })
        })
}

/*============================
    CARDS DATA ACTIONS
==============================*/

export const uploadCardImage = (formData, timelineId, cardId) => (dispatch) => {
    // dispatch({ type: LOADING_UI });
    return  axios.post(`/timeline/${timelineId}/${cardId}/image`, formData)
        .then((res) => {
           return dispatch({
                type: UPLOAD_IMAGE_CARD,
                payload: res.data.resCard
            })
        })
        .catch(err => {
            return dispatch({
                type: EDIT_CARD_ERROR
            })
        });
};

// Post new Card 
export const postCard = (newCard, timelineId) => (dispatch) => {

    // dispatch({ type: LOADING_UI });
    return axios
        .post(`/timeline/${timelineId}/comment`, newCard)
        .then(res => {
           return dispatch({
                type: POST_CARD,
                payload: res.data
            });
           // dispatch(clearErrors());
        })
        .catch(err => {
            // if not logged in err.response.data is undefined, check how to handle
           return dispatch({
                type: SET_ERRORS,
                payload: err.message
            });
        });
}

// Edit Timeline Card
export const editCardDetails = (timelineId, cardId , card) => (dispatch) => {
    return axios.post('/timeline/'+timelineId+'/'+cardId+'/edit' , card)
        .then((res) => {
           return dispatch({
                type: EDIT_CARD,
                payload: res.data.card
            }) 
        })
        .catch(err => {
            console.log('err edit details' , err);
            return dispatch({
                type: EDIT_CARD_ERROR
            })
        });
};

export const uploadTimelineImage = (formData, timelineId) => (dispatch) => {
    // dispatch({ type: LOADING_UI });
    return  axios.post(`/timeline/${timelineId}/image`, formData)
        .then((res) => {
           return dispatch({
                type: UPLOAD_IMAGE_TIMELINE,
                payload: res.data.resTimeline
            })
        })
        .catch(err => {
            return dispatch({
                type: EDIT_TIMELINE_ERROR
            })
        });
};

// Get Timeline Ratings
export const getTimelineRatings = (timelineId) => (dispatch) => {
    // dispatch({type: LOADING_DATA});
    axios.get('/ratings/' + timelineId)
        .then((res) => {
            // console.log('res.data' , res.data);
            if (res.data) {
                dispatch({
                    type: SET_RATINGS,
                    payload: res.data
                })
            }
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => {
            console.log('err? on ratings', err);
            // dispatch({
            //     type: SET_RATINGS,
            //     payload: []
            // })
        })
};

// Like timeline Card
export const likeTimelineCard = (timelineId, cardId) => dispatch => {
    axios.post(`/timeline/${timelineId}/card/${cardId}/like/1`)
        .then((res) => {
            dispatch({
                type: LIKE_TIMELINE_CARD,
                payload: res.data
            })
            if (res.data !== '') {
                dispatch(getTimelineRatings(timelineId));
            }
        })
        .catch((err) => {
            dispatch({
                type: LIKE_TIMELINE_CARD,
                payload: 'err like card'
            })
        })
};

// Dislike timeline Card
export const dislikeTimelineCard = (timelineId, cardId) => dispatch => {
    axios.post(`/timeline/${timelineId}/card/${cardId}/like/2`)
        .then((res) => {
            dispatch({
                type: DISLIKE_TIMELINE_CARD,
                payload: res.data
            })
            if (res.data !== '') {
                dispatch(getTimelineRatings(timelineId));
            }
        })
        .catch((err) => {
            dispatch({
                type: DISLIKE_TIMELINE_CARD,
                payload: 'err dislike card'
            })
        })
}

// Delete Card
export const deleteCard = (timelineId, cardId) => dispatch => {
    // console.log('card in data action ' + cardId);
    axios.delete(`/timeline/${timelineId}/${cardId}/delete`)
        .then(() => {
            dispatch({
                type: DELETE_CARD,
                payload: cardId
            })
        })
        .catch((err) => console.log('deleteCard', err));
}

// Get user data in user page
// gets all timelines created by user (not implemented yet or maybe won't implement it)
// export const getUserTimelineData = (userHandle) => dispatch => {
//     dispatch({ type: LOADING_UI });
//     axios.get(`/user/timelines/${userHandle}`)
//         .then((res) => {
//             dispatch({
//                 type: SET_FAVORITES,
//                 payload: res.data.timelines
//             });
//         })
//         .catch(() => {
//             dispatch({
//                 type: SET_FAVORITES,
//                 payload: []
//             });
//         })
// }

export const getUserFavoriteTimelines = (userHandle) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/user/favorites/${userHandle}`)
        .then((res) => {
            // console.log(res.data);
            dispatch({
                type: SET_FAVORITES,
                payload: res.data.timelines
            });
            dispatch({type : STOP_LOADING_UI});
        })
        .catch(() => {
            dispatch({
                type: SET_FAVORITES,
                payload: []
            });
        })
}

// Get user data in user page
// export const getUserData = (userHandle) => dispatch => {
//     dispatch({ type: LOADING_UI });
//     axios.get(`/user/${userHandle}`)
//         .then((res) => {
//             // api gets user object and screams
//             // payload is the screams of the user
//             // we don't set user details 
//             // because the details are for the authenticaded uer
//             // user with screams here will be in res.data.screams
//             dispatch({
//                 type: SET_SCREAMS,
//                 payload: res.data.screams
//             });
//             // no need to stop loading
//             // because set_screams does that
//         })
//         .catch(() => {
//             dispatch({
//                 type: SET_SCREAMS,
//                 payload: null
//             });
//         })

// }

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
}
