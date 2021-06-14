import { LOAD_NOTES, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from '../actions/actionTypes'

function notesReducer(state = [], action) {
    console.log({ state, action });
    switch (action.type) {
        case LOAD_NOTES:
            console.log('@LOAD_NOTES');
            console.log({ state, action });
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
            console.log('@UPDATE_NOTES');
            console.log({ state, action });
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
            console.log('@DELETE_NOTE');
            console.log({ state, action });
            return state.filter(note => note.id !== action.index);

        default:
            return state;
    }
}

export default notesReducer
