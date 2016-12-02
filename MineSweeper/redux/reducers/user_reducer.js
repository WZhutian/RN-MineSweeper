'use strict';

module.exports = (action = {}) => {
    switch (action.type) {
        case GET_LOCAL_USER :
            // return action.userVO.getJson();
        case SET_USER_TYPE_INFO:
            // return action.userVO.getJson();
        case DO_LOGIN:
            // return action.userVO.getJson();
        case SET_USER_INFO:
            // return action.userVO.getJson();
        case DO_LOGOUT:
        case RESET:
            // return userVO.getJson();
        case SET_PKHOUSE:
            // return action.userVO.getJson();
        default:
            return false;
    }
};
