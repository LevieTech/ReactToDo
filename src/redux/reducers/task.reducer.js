const initialState = {
    currentTaskId: null,
    userTasks: [],  
    savedTasks: [], 
    task: [],       
};

function taskReducer(state = initialState, action) {
    console.log("Action received:", action.type, "with payload:", action.payload); // log for every action received

    switch (action.type) {
        case "ADD_TASK":
            console.log("Received ADD_TASK with payload:", action.payload);
            return {
                ...state,
                userTasks: [
                    ...state.userTasks,
                    action.payload
                ],
            };
            
            
        case "SAVE_TASKS":
         
            const newUserTasksForSave = [
                ...state.userTasks,
                action.payload,
                 
            ];
            console.log("New userTasks after SAVE_TASKS:", newUserTasksForSave);
            return {
                ...state,
                userTasks: newUserTasksForSave,
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
            console.log("Updated userTasks after EDIT_TASK:", updatedUserTasks);
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
            const updatedTasks = state.userTasks.map((task) =>
                task.id === action.payload.id
                    ? {
                        ...task,
                        ...action.payload,
                        startDate: action.payload.startDate,
                        endDate: action.payload.endDate,
                    }
                    : task
            );
            console.log("Updated userTasks after UPDATE_TASK_SUCCESS:", updatedTasks);
            return {
                ...state,
                userTasks: updatedTasks,
            };

        default:
            return state;
    }
}

export default taskReducer;
