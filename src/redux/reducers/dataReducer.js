import {
    LOADING_DATA,
    SET_TIMELINES,
    GET_ITMELINES_ERROR,
    SET_TIMELINE,
    LIKE_TIMELINE,
    UNLIKE_TIMELINE,
    SET_FAVORITES,
    FAVORITE_TIMELINE,
    UNFAVORITE_TIMELINE,
    SET_RATINGS,
    LIKE_TIMELINE_CARD,
    DISLIKE_TIMELINE_CARD,
    SET_RECENT_ACTIVITY,
    SET_RECENT_ACTIVITY_ERROR,
    POST_TIMELINE,
    DELETE_TIMELINE,
    EDIT_TIMELINE,
    DELETE_CARD,
    POST_CARD,
    EDIT_CARD,
    UPLOAD_IMAGE_TIMELINE,
    UPLOAD_IMAGE_CARD

} from '../types';

const initialState = {
    timelines: [],
    timeline: {},
    ratings: [],
    activities: [],
    favorites: [],
    loading: false,
    hasMore: false,
    hasMoreCards: false,
    totalRecords: 0,
    totalRecordsCards: 0,
    page: 0,
    pageCards: 0,
    pageCount: 0,
    pageCountCards: 0,
    errors: null,
    errorsMainTimeline: null,
    errorsPaginateTimeline : null,
    errorsCards: null,
    errorActivities: null,
    errorLikeCards: ''
};

export default function (state = initialState, action) {
    switch (action.type) {

        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };

        /*============================
            TIMELINES DATA REDUCERS
        ==============================*/

        case SET_TIMELINES: {
            if (action.payload !== null) {

                state.timelines.filter((timeline, index) => {
                    for (let i = 0; i < action.payload.timelines.length; i++) {
                        // console.log('title', timeline.title);
                        // console.log('payload title', action.payload.timelines[i].title)
                        if (timeline.timelineId === action.payload.timelines[i].timelineId) {
                            // console.log('should splice at position ', index);
                            action.payload.timelines.splice(i, 1);
                            // console.log('state timelines', state.timelines)
                        } else {

                        }
                    }
                })

                return {
                    ...state,
                    loading: false,
                    hasMore: action.payload.page === action.payload.pageCount ? false : true,
                    totalRecords: action.payload.totalRecords,
                    page: action.payload.page,
                    pageCount: action.payload.pageCount,
                    status: action.payload.status,
                    errors: '',
                    timelines: [
                        ...state.timelines,
                        ...action.payload.timelines,
                    ],
                }
            } else {
                return {
                    ...state,
                    errors: GET_ITMELINES_ERROR,
                    loading: false
                }
            }
        }

        case SET_TIMELINE: {

            // console.log('received cards in reducer : ', action.payload.timeline.cards);
            if(action.payload === 'paginateError'){
                return {
                    ...state,
                    errorsPaginateTimeline : 'Error retrieving timeline cards, please try again',
                    loading: false
                }
            }

            if (action.payload !== null) {
                if (action.payload.page === 1) {

                    return {
                        ...state,
                        loading: false,
                        hasMoreCards: action.payload.page === action.payload.pageCount ? false : true,
                        totalRecordsCards: action.payload.totalRecords,
                        pageCards: action.payload.page,
                        pageCountCards: action.payload.pageCount,
                        status: action.payload.status,
                        timeline: action.payload.timeline,
                        errorsMainTimeline : '',
                        errorsPaginateTimeline: ''
                        
                    }
                }
                else {

                    state.timeline.cards.filter((card, index) => {
                        for (let i = 0; i < action.payload.timeline.cards.length; i++) {
                            // console.log('title', timeline.title);
                            // console.log('payload title', action.payload.timelines[i].title)
                            if (card.cardId === action.payload.timeline.cards[i].cardId) {
                                // console.log('title', card.cardId);
                                // console.log('payload title', action.payload.timeline.cards[i].cardId)
                                // console.log('should splice at position ', index);
                                action.payload.timeline.cards.splice(i, 1);
                                // console.log('state cards', state.timeline.cards)
                            } else {

                            }
                        }
                    })
                    return {
                        ...state,
                        loading: false,
                        hasMoreCards: action.payload.page === action.payload.pageCount ? false : true,
                        totalRecordsCards: action.payload.totalRecords,
                        pageCards: action.payload.page,
                        pageCountCards: action.payload.pageCount,
                        status: action.payload.status,
                        errorsMainTimeline : '',
                        errorsPaginateTimeline: '',
                        timeline:
                            Object.assign(
                                state.timeline,
                                {},
                                {
                                    cards: [...state.timeline.cards, ...action.payload.timeline.cards]
                                })
                    }
                }
            } else {
                return {
                    ...state,
                    errorsMainTimeline : 'Retrieving timeline, please try again',
                    errorsPaginateTimeline: '',
                    loading: false
                }
            }
        }

        case LIKE_TIMELINE: {
            // let index = state.timelines.findIndex(
            //     timeline => timeline.timelineId === action.payload.timelineId
            // );
            // state.timelines[index].likeCount = action.payload.likeCount;
            // if (state.timeline.timelineId === action.payload.timelineId)
            //     state.timeline = { ...state.timeline, ...action.payload };
            // return {
            //     ...state
            // };

            // find the timeline
            let index = state.timelines.findIndex((timeline) => timeline.timelineId === action.payload.timelineId);
            state.timelines[index] = action.payload;
            // update opened timeline like count, so that the opened timeline will have same like count as timeline in list
            if (state.timeline.timelineId === action.payload.timelineId) {
                state.timeline = action.payload;
            }

            return {
                ...state
            };
        }

        case FAVORITE_TIMELINE: {
            // find the timeline
            let index = state.timelines.findIndex((timeline) => timeline.timelineId === action.payload.timelineId);
            state.timelines[index] = action.payload;
            // update opened timeline like count, so that the opened timeline will have same like count as timeline in list
            if (state.timeline.timelineId === action.payload.timelineId) {
                state.timeline = action.payload;
            }

            return {
                ...state
            };
        }

        case UNFAVORITE_TIMELINE : {
            let index = state.timelines.findIndex(
                timeline => timeline.timelineId === action.payload.timelineId
            );
            // state.timelines[index].likeCount = action.payload.likeCount;
            if (state.timeline.timelineId === action.payload.timelineId)
                state.timeline = { ...state.timeline, ...action.payload };
            return {
                ...state
            }
        }

        case UNLIKE_TIMELINE: {
            let index = state.timelines.findIndex(
                timeline => timeline.timelineId === action.payload.timelineId
            );
            state.timelines[index].likeCount = action.payload.likeCount;
            if (state.timeline.timelineId === action.payload.timelineId)
                state.timeline = { ...state.timeline, ...action.payload };
            return {
                ...state
            };
        }

        case SET_FAVORITES: {
            return {
                ...state,
                favorites: action.payload
            }
        }

        case POST_TIMELINE:
            return {
                ...state,
                timelines: [action.payload, ...state.timelines]
            };

        case EDIT_TIMELINE: {
            let indexUpdate = state.timelines.findIndex((timeline) => timeline.timelineId === action.payload.timelineId);

            state.timelines[indexUpdate].title = action.payload.title
            state.timelines[indexUpdate].description = action.payload.description;

            return {
                ...state
            }
        }

        case UPLOAD_IMAGE_TIMELINE: {
            let indexUpdateImage = state.timelines.findIndex((timeline) => timeline.timelineId === action.payload.timelineId);

            state.timelines[indexUpdateImage].imageUrl = action.payload.image

            return {
                ...state
            }
        }

        case DELETE_TIMELINE: {
            let indexDelete = state.timelines.findIndex((timeline) => timeline.timelineId === action.payload);
            state.timelines.splice(indexDelete, 1);
            return {
                ...state
            };
        }

        /*============================
            CARDS DATA REDUCERS
        ==============================*/

        case POST_CARD:
            if (!state.timeline.cards) {

                return {
                    ...state,
                    timeline: {
                        ...state.timeline,
                        cards: [action.payload]
                    },
                    errorLikeCards: ''
                };
            } else {

                state.timeline.cards.unshift(action.payload);

                return {
                    ...state,
                    timeline: {
                        ...state.timeline,
                        cards: [...state.timeline.cards]
                    },
                    errorLikeCards: ''
                };
            }

        case EDIT_CARD: {
            let indexUpdate = state.timeline.cards.findIndex((card) => card.cardId === action.payload.cardId);

            state.timeline.cards[indexUpdate].title = action.payload.title
            state.timeline.cards[indexUpdate].body = action.payload.body;
            state.timeline.cards[indexUpdate].source = action.payload.source;
            state.timeline.cards[indexUpdate].cardDate = action.payload.cardDate;

            return {
                ...state,
                errorLikeCards: ''
            }
        }
        case DELETE_CARD: {
            let index = state.timeline.cards.findIndex((card) => card.cardId === action.payload);
            state.timeline.cards.splice(index, 1);

            return {
                ...state
                ,
                timeline: {
                    ...state.timeline,
                    cards: [...state.timeline.cards]
                },
                errorLikeCards: ''
            }
        }

        case UPLOAD_IMAGE_CARD : {

            let indexUpdate = state.timeline.cards.findIndex((card) => card.cardId === action.payload.cardId);

            state.timeline.cards[indexUpdate].imageUrl = action.payload.image

            return {
                ...state,
                errorLikeCards: ''
            }
        }
        
        case SET_RATINGS:
            return {
                ...state,
                ...action.payload,
                loading: false
            }

        case SET_RECENT_ACTIVITY:
            return {
                ...state,
                activities: action.payload,
                loading: false
            }

        case SET_RECENT_ACTIVITY_ERROR:
            return {
                ...state,
                activites: [],
                loading: false,
                errorActivities: 'error loading activities'
            }

        case DISLIKE_TIMELINE_CARD: {

            if(action.payload === 'err dislike card'){
                return {
                    ...state,
                    errorLikeCards: action.payload
                }
            }else{
                if(action.payload === ''){
                    return {
                        ...state,
                        errorLikeCards: 'Rating limit (2) exceeded'
                    }
                }
            }

            let index = state.timeline.cards.findIndex(x => x.cardId === action.payload.cardId);
            state.timeline.cards[index].dislikeCount = action.payload.dislikeCount;
            state.timeline.cards[index].likeCount = action.payload.likeCount;
            return {
                ...state,
                timeline: {
                    ...state.timeline,
                    cards: [...state.timeline.cards]
                },
                errorLikeCards: null
            }
        }

        case LIKE_TIMELINE_CARD: {
            if(action.payload === 'err like card'){
                return {
                    ...state,
                    errorLikeCards: action.payload
                }
            }else{
                if(action.payload === ''){
                    return {
                        ...state,
                        errorLikeCards: 'Rating limit (2) exceeded'
                    }
                }
            }

            let index = state.timeline.cards.findIndex(x => x.cardId === action.payload.cardId);

            state.timeline.cards[index].likeCount = action.payload.likeCount
            state.timeline.cards[index].dislikeCount = action.payload.dislikeCount;

            return {
                ...state,
                timeline: {
                    ...state.timeline,
                    cards: [...state.timeline.cards],
                },
                errorLikeCards : ''
            }
        }
        default: return state;
    }
}