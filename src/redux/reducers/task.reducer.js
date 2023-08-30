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
        case "SAVE_TASKS":
            const newUserTasks = [
                ...state.userTasks,
                {
                    ...action.payload,
                    taskname: action.payload.taskname,
                    dateadded: action.payload.dateadded,
                    duedate: action.payload.duedate,
                    prioritylevel: action.payload.prioritylevel,
                    completionstatus: action.payload.completionstatus,
                    notes: action.payload.notes,
                },
            ];
            console.log("New userTasks after ADD_TASK/SAVE_TASKS:", newUserTasks);
            return {
                ...state,
                userTasks: newUserTasks,
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
            console.log("New savedTasks after GET_SAVED_TASKS_SUCCESS:", action.payload);
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
