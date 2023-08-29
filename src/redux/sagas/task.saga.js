import {all, call, put, takeLatest, takeEvery, select } from "redux-saga/effects";
import axios from "axios";


function* addTask(action) {
    try {
      yield call(axios.post, "/api/task", action.payload);
      yield put({ type: "GET_SAVED_TASKS" });
    } catch (error) {
      console.log("Error adding task:", error);
      yield put({ type: "ADD_TASK_ERROR" });
    }
  }

function* saveTasks(action) {
    try {
      const userId = yield select((state) => state.user.id);
      const payload = { ...action.payload, userId };
      yield call(axios.post, "/api/task/allSave", payload);
      yield put({ type: "SAVE_TASK_SUCCESS", payload: { ...payload, startDate: payload.startDate, endDate: payload.endDate } });
      yield put({ type: "GET_SAVED_TASKS" }); // Optionally fetch the saved tasks after saving one.
    } catch (error) {
      console.log("Error saving task in saveTasks saga:", error);
      yield put({ type: "SAVE_TASK_ERROR" });
    }
}

function* getSavedTasks() {
    try {
        const tasks = yield call(axios.get, "/api/task"); // assuming this is the API endpoint to get saved tasks.
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