import { LOAD_NOTES, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from '../actions/actionTypes'

function notesReducer(state = [], action) {
    switch (action.type) {
        case LOAD_NOTES:
            return action.notes;

        case ADD_NOTE:
            return [
                ...state,
                {
                    id: action.id,
                    user_id: action.user_id,
                    project_id: action.project_id,
                    category_id: action.category_id,
                    description: action.description,
                    hours: action.hours,
                    date: action.date
                }
            ];

        case UPDATE_NOTE:
            return state.map(note => (note.id === action.index)
                ? {
                    ...note,
                    project_id: action.project_id,
                    category_id: action.category_id,
                    description: action.description,
                    hours: action.hours, date: action.date
                }
                : note
            );

        case DELETE_NOTE:
            return state.filter(note => note.id !== action.index);

        default:
            return state;
    }
}

export default notesReducer
