
const selectedTask = (state = [], action) => {
    if (action.type === 'SET_SELECTED_TASK') {
        return action.payload
    } else if (action.type === 'CLEAR_SELECTED_TASK') {
        return {}
    }
    return state
}

export default selectedTask;