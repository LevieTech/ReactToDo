import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* getPriorities() {
    try {
        const priorities = yield axios.get('/api/priority');
        yield put({ type: 'SET_PRIORITIES', payload: priorities.data });
        console.log('Checking priorities', priorities.data)
    } catch (error) {
        console.log('Error in fetching priorities', error)
    }
}

function* prioritySaga() {
    yield takeEvery('FETCH_PRIORITIES', getPriorities);
}

export default prioritySaga;