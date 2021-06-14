import { LOAD_PROJECTS } from '../actions/actionTypes'

function projectReducer(state = [], action) {
    console.log({ state, action });
    switch (action.type) {
        case LOAD_PROJECTS:
            console.log('@LOAD_PROJECTS');
            console.log({ state, action });
            return action.projects;

        default:
            return state;
    }
}

export default projectReducer
