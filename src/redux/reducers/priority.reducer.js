const priorityReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PRIORITIES':
            console.log('Reducer payload check', action.payload)
            return action.payload;
        default:
            return state;
    }
}

export default priorityReducer;