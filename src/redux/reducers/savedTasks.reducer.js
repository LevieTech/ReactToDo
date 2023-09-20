const savedTasks = (state = [], action) => {
    switch (action.type) {
        case 'MY_SAVED_TASKS':
            console.log('Reducer payload check', action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default savedTasks;