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
            if (!action.payload) {
                console.error("ADD_TASK action was dispatched without a payload");
                return state;
            }
            console.log("Received ADD_TASK with payload:", action.payload);
            return {
                ...state,
                task: [
                    ...state.task,
                    action.payload
                ],
            };

        case "SAVE_TASKS":
            if (!action.payload || !Array.isArray(action.payload)) {
                console.error("SAVE_TASKS action was dispatched with incorrect payload");
                return state;
            }
            return {
                ...state,

                task: [
                    ...state.task,
                    action.payload
                ],
            };

        case "EDIT_TASK": if (!action.payload || !('task' in action.payload) || !('index' in action.payload)) {
            console.error("EDIT_TASK action dispatched with incorrect payload");
            return state;
        }
            const { task, index } = action.payload;
            const updatedUserTasks = state.task.map((t, i) => {
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
                task: updatedUserTasks,
            };

        case "GET_SAVED_TASKS_SUCCESS":
            return {
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

        case "DELETE_TASK":
            return {
                ...state,
                userTasks: state.task.filter(task => task.id !== action.payload.taskID)
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

