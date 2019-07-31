import {FETCH_PRICES_BEGIN, FETCH_PRICES_FAILURE, FETCH_PRICES_SUCCESS} from "./actions";
import {combineReducers} from "redux";


const initial = {
    loading: false,
    data: [],
    error: null
};

export const pricesReducer = (state, action) => {
    switch (action.type) {
        case FETCH_PRICES_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_PRICES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case FETCH_PRICES_SUCCESS:
            console.log("ACTION PAYLOAD", action.payload);
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        default: return { ...initial, ...state};
    }
};

export const rootReducer = combineReducers({prices: pricesReducer});
