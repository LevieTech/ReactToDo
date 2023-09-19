const savedTasksReducer = (state = [], action) => {
    switch (action.type) {
        case 'MY_SAVED_TASKS':
            return action.payload;
        default:
            return state;
    }
};

export default savedTasksReducer;