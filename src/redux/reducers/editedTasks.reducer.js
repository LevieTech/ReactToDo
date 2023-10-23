const editedTasks = (state = {}, action) => {
    switch(action.type) {
        case 'EDITED_TASKS':
            console.log('In Edit Tasks reducer!', action.payload)
            return {...action.payload};
        default:
            return state;
    }
}

export default editedTasks;