'use strict';
import {AsyncStorage} from 'react-native';
import {actionTypes} from 'config';
let {
    SET_PAGE_REFRESH_FLAG
} = actionTypes;

let initialState = {
    commonState: {
      refreshRouteName: false
    }
}

module.exports = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_PAGE_REFRESH_FLAG :
            return {
              ...state,
              commonState: {
                refreshRouteName: action.data
              }
            }
        default:
            return state;
    }
};
