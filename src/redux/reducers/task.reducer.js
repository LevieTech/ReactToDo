const initialState = {
    currentTaskId: null,
    error: null,
    task: [], 
    savedTasks: [],
};

const taskReducer = (state = initialState, action) => {
    console.log("Action received:", action.type, "with payload:", action.payload); // log for every action received
    console.log("Previous State:", state, "Action:", action);// Log for the initial state and action

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
              case 'EDIT_TASK': 
            console.log("Before Update:", state.savedTasks);
            console.log("Action Payload:", action.payload);
            const updatedTasks = state.savedTasks.map(task => {
                console.log("Matching ID:", task.id, action.payload.id);
                return task.id === action.payload.id ? action.payload : task;
            });
            console.log('Updated Tasks:', updatedTasks);
            return {
                ...state,
                savedTasks: updatedTasks,
            };
            
        case 'EDIT_TASK_SUCCESS':
            return state.map(task =>
                task.id === action.payload.id ? action.payload : task
            );
            

        case "GET_SAVED_TASKS_SUCCESS":
            return {
                savedTasks: action.payload,
            };
            case 'EDIT_TASK_ERROR':
                return {
                    ...state,
                    error: action.payload,
                };
                
        // case "UPDATE_TASK_SUCCESS":
        //     const updatedTasks = state.task.map((task) =>
        //         task.id === action.payload.id
        //             ? {
        //                 ...task,
        //                 ...action.payload
        //             }
        //             : task
        //     );
        //     return {
        //         ...state,
        //         userTasks: updatedTasks,
        //     };

        

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


