import {all, call, put, takeLatest, takeEvery, select } from "redux-saga/effects";
import axios from "axios";

//! Add Task
function* addTask(action) {
    try {
        const response = yield call(axios.post, "/api/task", action.payload);
        console.log("Server Response:", response.data); // Log the server response
        yield put({ type: "ADD_TASK_SUCCESS", payload: response.data }); // Dispatch success action

    } catch (error) {
        console.log("Error adding task:", error);
        yield put({ type: "ADD_TASK_ERROR" });
    }
}

//! Fetch Tasks
function* fetchTask(action) {
    try {
        const response = yield call(axios.get, "/api/tasks/", action.payload); // assuming action.payload contains any required parameters
        console.log("Tasks fetched successfully:", response.data);
        yield put({ type: "FETCH_TASK_SUCCESS", payload: response.data });  // dispatch success action with fetched tasks
    } catch (error) {
        console.log("Error fetching tasks:", error);
        yield put({ type: "FETCH_TASK_ERROR", error });  // dispatch an error action
    }
}

//! Fetch selected task for editing
function* fetchSelectedTask(action) {
    try {
        const selectedTask = yield axios.get(`/api/task/${action.payload}`);
        console.log(`Checking selectedTask in saga`, selectedTask.data);
        yield put ({ type: 'SET_SELECTED_TASK', payload: selectedTask.data[0] })
    } catch (error) {
        console.log(`Error in fetchSelectedTask in saga. ${error}`);
    }
}

//! Update Task Success
function* updateTaskSuccess(action) {
    try {
        const response = yield call(axios.get, "/api/task"); // refetch all tasks
        yield put({ type: "FETCH_TASK_SUCCESS", payload: response.data });  // dispatch success action with fetched tasks
    } catch (error) {
        console.log("Error refetching tasks after update:", error);
        yield put({ type: "FETCH_TASK_ERROR", error });  // dispatch an error action
    }
}

//! Save Tasks
function* saveTasks(action) {
    try {
      const userId = yield select((state) => state.user.id);
      const payload = { ...action.payload, userId };
      console.log("Attempting to save tasks with payload:", payload);
      yield call(axios.post, "/api/task/allSave", payload);
    } catch (error) {
      console.log("Error saving task in saveTasks saga:", error);
      yield put({ type: "SAVE_TASK_ERROR" });
    }
}

//! Get saved tasks
function* getSavedTasks() {
    try {
        const tasks = yield axios.get("/api/task");
        yield put({ type: "MY_SAVED_TASKS", payload: tasks.data }); 
    } catch (error) {
        console.log("Error fetching saved tasks:", error);
        yield put({ type: "GET_SAVED_TASKS_ERROR" });
    }
}

//! Delete task
function* deleteTask(action) {
    try {
        yield axios.delete(`/api/task/${action.payload}`);
        yield put({ type: 'MY_SAVED_TASKS' })
    } catch (error) {
        console.log(`Error in deleteing Task`, error);
    }
}

//! Edit task
function* editTask(action) {
    try {
        console.log("Editing Task", action.payload);
        yield axios.put(`/api/task/`, action.payload);
        yield put({ type: 'EDITED_TASKS'});
    } catch (error) {
        console.log(`Error in completing Edit Task! ${error}`);
    }
}

//! Set to complete status
function* setCompStatus(action) {
    try {
        yield axios.put((`/api/task/complete/${action.payload}`));
    } catch (error) {
        console.log(`Error in setting status to Complete ${error}`)
        alert('Something went wrong!');
    }
}

//! Set to incomplete status
function* setIncompStatus(action) {
    try {
        yield axios.put((`/api/task/incomplete/${action.payload}`));
    } catch (error) {
        console.log(`Error in setting status to Incomplete ${error}`);
        alert('Something went wrong!')
    }
}

function* taskSaga() {
    yield takeLatest("SAVE_TASKS", saveTasks);
    yield takeEvery("FETCH_SAVED_TASKS", getSavedTasks);
    yield takeEvery("ADD_TASK", addTask);
    yield takeEvery('DELETE_TASK', deleteTask);
    yield takeEvery('EDIT_THIS_TASK', editTask);
    yield takeEvery("FETCH_TASK", fetchTask);
    yield takeEvery("UPDATE_TASK_SUCCESS", updateTaskSuccess);
    yield takeEvery("SET_COMP_STATUS", setCompStatus);
    yield takeEvery("SET_INCOMP_STATUS", setIncompStatus);
    yield takeEvery('FETCH_SELECTED_TASK', fetchSelectedTask);
}
export default taskSaga;