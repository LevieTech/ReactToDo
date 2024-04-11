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

        case "GET_SAVED_TASKS_SUCCESS":
            return {
                ...state,
                savedTasks: action.payload,
            };

        case "UPDATE_TASK_SUCCESS":
            const updatedTasks = state.task.map((task) =>
                task.id === action.payload.id
                    ? {
                        ...task,
                        ...action.payload
                    }
                    : task
            );
            return {
                ...state,
                userTasks: updatedTasks,
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


