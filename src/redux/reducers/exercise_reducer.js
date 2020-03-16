const initState = {
    exercises: [],
    isLoading: false,
    moreLoading: false,
    exercisesLoaded: false,
    allExercisesLoaded: false,
    exerciseAddedState: '',
    lastExercise: null
}

const exerciseReducer = (state = initState, action) => {
    let exercises = []
    switch (action.type) {
        case 'START_EXERCISES_REQUEST':
            return {
                ...state,
                isLoading: true,
                exerciseAddedState: ''
            }

        case 'START_EXERCISES_MORE_REQUEST':
            return {
                ...state,
                moreLoading: true,                
            }

        case 'FETCH_EXERCISES_SUCCESS':            
            return {
                ...state,
                exercises: action.exercises,
                isLoading: false,
                exercisesLoaded: true,
                allExercisesLoaded: action.exercises.length < 6 ? true : false,
                lastExercise: action.lastExercise
            }

        case 'FETCH_EXERCISES_ERROR':
            alert('Błąd: ' + action.err.message);
            return {
                ...state,                
                isLoading: false
            }

        case 'FETCH_MORE_EXERCISES_SUCCESS':            
            exercises = [...state.exercises, ...action.exercises]
            return {
                ...state,
                moreLoading: false,
                exercises,
                allExercisesLoaded: action.exercises.length < 6 ? true : false,
                lastExercise: action.lastExercise
            }

        case 'FETCH_MORE_EXERCISES_ERROR':
            alert('Błąd: ' + action.err.message)
            return {
                ...state,
                moreLoading: false
            }

        case 'ADD_EXERCISE_SUCCESS':
            let exercise = action.exercise;
            exercises = [...state.exercises, exercise]
            return {
                ...state,
                isLoading: false,
                exercises,
                exerciseAddedState: 'SUCCESS'
            }

        case 'ADD_EXERCISE_ERROR':
            alert('Błąd: ' + action.err.message)
            return {
                ...state,
                isLoading: false,
                exerciseAddedState: 'ERROR'
            }

        case 'DELETE_EXERCISE_SUCCESS':
            exercises = state.exercises.filter((exercise) => {
                return exercise.id !== action.id
            })
            return {
                ...state,
                exercises,
                isLoading: false,                
            };

        case 'DELETE_EXERCISE_ERROR':
            alert('Błąd: ' + action.err.message)
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
    }
}

export default exerciseReducer