const editedTasks = (state = {}, action) => {
    switch(action.type) {
        case 'EDITED_TASKS':
            return {...action.payload};
        default:
            return state;
    }
}

export default editedTasks;