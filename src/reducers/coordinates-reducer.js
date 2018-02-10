import { FETCH_COORDS } from '../actions/fetch-coordinates';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_COORDS:
            return action.payload;
    }

    return state;
}