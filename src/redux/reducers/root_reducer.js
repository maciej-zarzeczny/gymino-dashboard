import authReducer from './auth_reducer'
import { combineReducers } from 'redux'
import workoutReducer from './workout_reducer'
import userReducer from './user_reducer'
import exerciseReducer from './exercise_reducer'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,    
    workout: workoutReducer,
    user: userReducer,
    exercise: exerciseReducer
})

export default rootReducer