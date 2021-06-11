import * as actions from '../actions/actionTypes'

function userReducer(state = [], action) {
    switch (action.type) { 
        case actions.LOAD_USER:
            return { user: action.user };

        default:
            return state;
    }
}

export default userReducer