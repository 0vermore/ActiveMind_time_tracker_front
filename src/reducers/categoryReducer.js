import { LOAD_CATEGORIES } from '../actions/actionTypes'

function categoryReducer(state = [], action) {
    console.log({ state, action });
    switch (action.type) {
        case LOAD_CATEGORIES:
            return action.categories;

        default:
            return state;
    }
}

export default categoryReducer