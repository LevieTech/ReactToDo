
const selectedTask = (state = {}, action) => {
    if (action.type === 'SET_SELECTED_KIT') {
        return action.payload
    } else if (action.type === 'CLEAR_SELECTED_KIT') {
        return {}
    }
    return state
}

export default selectedTask