import {all, call, put, takeLatest, takeEvery, select } from "redux-saga/effects";
import axios from "axios";

function* addTask(action) {
  try {
    console.log("Attempting to add task with payload:", action.payload);
    const response = yield call(axios.post, "/api/task", action.payload);
    console.log("Server Response:", response.data);  // Log the server response
    console.log("Task added successfully");
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
        const tasks = yield call(axios.get, "/api/task");
        console.log("Fetched tasks successfully:", tasks.data);
        yield put({ type: "GET_SAVED_TASKS_SUCCESS", payload: tasks.data }); 
    } catch (error) {
        console.log("Error fetching saved tasks:", error);
        yield put({ type: "GET_SAVED_TASKS_ERROR" });
    }
}


function* taskSaga() {
    yield takeLatest("SAVE_TASKS", saveTasks);
    yield takeLatest("GET_SAVED_TASKS", getSavedTasks);
    yield takeLatest("ADD_TASK", addTask);
}
export default taskSaga;