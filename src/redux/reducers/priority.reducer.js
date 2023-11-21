const priorityReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PRIORITIES':
            return action.payload;
        default:
            return state;
    }
}

export default priorityReducer;