import * as actions from './actionTypes'

export function loadNotes(notes) {
    return { type: actions.LOAD_NOTES, notes: notes }
}

export function addNote(id, user, project, category, description, hours, date) {
    return {
        type: actions.ADD_NOTE, id: id, user: user, project: project,
        category: category, description: description, hours: hours, date: date
    }
}

export function updateNote(index, project, category, description, hours, date) {
    return {
        type: actions.UPDATE_NOTE, index: index,
        project: project, category: category, description: description, hours: hours, date: date
    }
}

export function deleteNote(index) {
    return { type: actions.DELETE_NOTE, index: index }
}

//--------------------------------------------

export function loadProjects(projects) {
    return { type: actions.LOAD_PROJECTS, projects: projects }
}

//--------------------------------------------

export function loadCategories(categories) {
    return { type: actions.LOAD_CATEGORIES, categories: categories }
}

//--------------------------------------------

export function loadUsers(users) {
    return { type: actions.LOAD_USERS, users: users }
}

//--------------------------------------------

export function authenticated() {
    return { type: actions.AUTHENTICATED }
}

export function unauthenticated(error) {
    return { type: actions.UnAUTHENTICATED, error: error }
}