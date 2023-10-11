import {all, call, put, takeLatest, takeEvery, select } from "redux-saga/effects";
import axios from "axios";

function* addTask(action) {
    try {
        console.log("Attempting to add task with payload:", action.payload);
        const response = yield call(axios.post, "/api/task", action.payload);
        console.log("Server Response:", response.data); // Log the server response
        console.log("Task added successfully");
        console.log("Dispatching action: ADD_TASK_SUCCESS with payload:", response.data);
        yield put({ type: "ADD_TASK_SUCCESS", payload: response.data }); // Dispatch success action

    } catch (error) {
        console.log("Error adding task:", error);
        yield put({ type: "ADD_TASK_ERROR" });
    }
}

function* saveTasks(action) {
    try {
      const userId = yield select((state) => state.user.id);
      const payload = { ...action.payload, userId };
      console.log("Attempting to save tasks with payload:", payload);
      yield call(axios.post, "/api/task/allSave", payload);
      console.log("Tasks saved successfully");
      // yield put({ type: "GET_SAVED_TASKS" }); //
    } catch (error) {
      console.log("Error saving task in saveTasks saga:", error);
      yield put({ type: "SAVE_TASK_ERROR" });
    }
}

function* getSavedTasks() {
    try {
        console.log("Attempting to fetch saved tasks");
        const tasks = yield axios.get("/api/task");
        console.log("Fetched tasks successfully:", tasks.data);
        yield put({ type: "MY_SAVED_TASKS", payload: tasks.data }); 
    } catch (error) {
        console.log("Error fetching saved tasks:", error);
        yield put({ type: "GET_SAVED_TASKS_ERROR" });
    }
}

function* deleteTask(action) {
    try {
        console.log("Delete Task");
        yield axios.delete(`/api/task/${action.payload}`);
        yield put({ type: 'MY_SAVED_TASKS' })
    } catch (error) {
        console.log(`Error in deleteing Task`, error);
    }
}
function* editTask(action) {
    try {
        console.log('Saga received action:', action);
        console.log("Received EDIT_TASK Action in Saga with Payload:", action.payload);
        console.log("Entire EDIT_TASK Action:", action); 
        const { id, ...updatedData } = action.payload; 
        if (!id) {
            console.log("Task ID is missing in the action payload. Cannot proceed with the edit task.");
            return;
        }
        const response = yield axios.put(`/api/task/${id}`, updatedData);
        console.log("Axios PUT Request Response:", response); 
        console.log("Axios PUT Request Response:", response.data); 

        console.log("Server Response After PUT Request:", response); 
        console.log("Axios PUT Request Response:", response.data); 
        if (response.status !== 200) {
            console.log("Failed to update the task on the server. Status Code:", response.status);
            return;
        }

        yield put({ type: 'MY_SAVED_TASKS' });
        console.log('Dispatched MY_SAVED_TASKS After Editing Task');
        console.log('Server response:', response);
    } catch (error) {
        console.log("Error Occurred During Editing Task:", error);
        console.log('Error in saga:', error);
        yield put({ type: 'EDIT_TASK_ERROR', payload: error.message });
    }
}




function* taskSaga() {
    yield takeLatest("SAVE_TASKS", saveTasks);
    yield takeEvery("FETCH_SAVED_TASKS", getSavedTasks);
    yield takeEvery("ADD_TASK", addTask);
    yield takeEvery('DELETE_TASK', deleteTask);
    yield takeEvery('EDIT_TASK', editTask);
}
export default taskSaga;