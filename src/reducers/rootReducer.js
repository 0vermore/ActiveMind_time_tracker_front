import { combineReducers } from 'redux'
import notesReducer from './notesReducer'
import authReducer from './authReducer'
import projectReducer from './projectReducer';
import categoryReducer from './categoryReducer';
import usersReducer from './usersReduser';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    notes: notesReducer,
    auth: authReducer,
    projects: projectReducer,
    categories: categoryReducer,
    users: usersReducer,
    user: userReducer
});

export default rootReducer
