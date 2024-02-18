import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* getPriorities() {
    try {
        const priorities = yield axios.get('/api/priority');
        yield put({ type: 'SET_PRIORITIES', payload: priorities.data });
    } catch (error) {
        console.log('Error in fetching priorities', error)
    }
}

function* getTasksByPriority(action) {
    try {
        const taskPriorities = yield axios.get(`/api/priority/${action.payload}`);
        // ! This is the attempt to retrieve all tasks from the Priority Saga
        // ? Maybe move this into the router and create an async function to return the tasklist if the id === 4
        // let taskPriorities = [];
        // console.log('checking action.payload', action.payload);
        // if (action.payload === 4) {
        //     yield axios.get("/api/task");
        // } else {
        //     yield axios.get(`/api/priority/${action.payload}`);
        //     console.log('Trying this out priority saga');
        // }
        yield put({ type: 'SET_SORTED_TASKS', payload: taskPriorities.data });
    } catch (error) {
        console.log(`Error in fetching sorted Tasks ${error}`);
    }
}

function* prioritySaga() {
    yield takeEvery('FETCH_PRIORITIES', getPriorities);
    yield takeEvery('FETCH_SORTED_TASKS', getTasksByPriority);
}

export default prioritySaga;