const sortedTasksReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SORTED_TASKS':
            return action.payload;
        default:
            return state;
    }
}

export default sortedTasksReducer;