import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTasks() {
    try {
        const tasks = yield axios.get('/api/tasklist');
        yield put ({ type: 'SET_TASKS', payload: tasks.data });
    } catch (error) {
        console.log(`Error in fetchTasks: ${error}`);
        alert('Something went wrong')
    }
}

function* taskSaga() {
    yield takeEvery('FETCH_TASKS', fetchTasks)
}

export default taskSaga;