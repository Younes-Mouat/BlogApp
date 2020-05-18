import authReducer from './authReducer'
import projectReducer from './projectReducer'
import editProfileReducer from './editProfileReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducers = combineReducers({
    auth: authReducer,
    project: projectReducer,
    edit: editProfileReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducers