const initialState = {
    currentTaskId: null,
    userTasks: [],  
    savedTasks: [], 
    task: [],       
};

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TASK":
        case "SAVE_TASKS":
            return {
                ...state,
                userTasks: [
                    ...state.userTasks,
                    {
                        ...action.payload,
                        taskName: action.payload.taskName,
                        dateAdded: action.payload.dateAdded,
                        dueDate: action.payload.dueDate,
                        priorityLevel: action.payload.priorityLevel,
                        completionStatus: action.payload.completionStatus,
                        notes: action.payload.notes,
                    },
                ],
            };

        case "EDIT_TASK":
            const { task, index } = action.payload;
            const updatedUserTasks = state.userTasks.map((t, i) => {
                if (i === index) {
                    return {
                        ...t,    
                        ...task,
                    };
                }
                return t;
            });
            return {
                ...state,
                userTasks: updatedUserTasks,
            };

        case "GET_SAVED_TASKS_SUCCESS":
            return {
                ...state,
                savedTasks: action.payload, 
            };

        case "UPDATE_TASK_SUCCESS":
            return {
                ...state,
                userTasks: state.userTasks.map((task) =>
                    task.id === action.payload.id
                        ? {
                            ...task,
                            ...action.payload,
                            startDate: action.payload.startDate,
                            endDate: action.payload.endDate,
                        }
                        : task
                ),
            };

        default:
            return state;
    }
}

export default taskReducer;