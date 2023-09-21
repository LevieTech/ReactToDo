const initialState = {
    currentTaskId: null,
    error: null,
    task: [], 
    savedTasks: [],
};

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                task: [...state.task, action.payload]
           };
            case 'FETCH_TASK': {
                
                return {
                  ...state,
                  tasks: action.payload 
                };
              }    
            case 'EDIT_TASK': {
                const { taskId, ...updatedData } = action.payload;
                return {
                  ...state,
                  task: state.task.map(task => 
                    task.id === taskId ? { ...task, ...updatedData } : task
                  )
                };
              }
             
        // case "EDIT_TASK":
        //     const updatedTasks = state.task.map(t => 
        //         t.id === action.payload.id 
        //             ? { ...t, ...action.payload }
        //             : t
        //     );
        //     return {
        //         ...state,
        //         task: updatedTasks
        //     };

        case "GET_SAVED_TASKS_SUCCESS":
            return {
                ...state,
                savedTasks: action.payload,
            };

        case "DELETE_TASK":
            return {
                ...state,
                task: state.task.filter(t => t.id !== action.payload.taskID)
            };

        case "ADD_TASK_ERROR":
            return {
                ...state,
                error: "Error while adding a task",
            };

        default:
            return state;
    }
}

export default taskReducer;


