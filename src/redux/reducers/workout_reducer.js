const initState = {
    topWorkouts: [
        { 'id': 1, 'imageUrl': 'training_1.jpg', 'name': 'Trening dla początkujących', 'amount': 15000 },
        { 'id': 2, 'imageUrl': 'training_2.jpg', 'name': 'Trening na poręczach', 'amount': 12000 },
        { 'id': 3, 'imageUrl': 'training_3.jpg', 'name': 'Trening w domu dla zaawansowanych', 'amount': 8000 },
        { 'id': 4, 'imageUrl': 'training_4.jpg', 'name': 'Korpus ze stali', 'amount': 5000 },
        { 'id': 5, 'imageUrl': 'training_5.jpg', 'name': 'Naucz się stać na rękach', 'amount': 3000 },
    ],
    workouts: null
}

const workoutReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_WORKOUTS':
            let workouts = []
            if (action.workouts.length !== 0) {
                workouts = [...state.workouts, ...action.workouts]
            }
            
            return {
                ...state,
                workouts
            }     

        case 'GET_WORKOUTS_ERROR':
            console.log('get workouts error', action.err)
            return state;

        case 'CREATE_WORKOUT':
            console.log(action.workout);
            return state;

        case 'CREATE_WORKOUT_ERROR':
            console.log('create workout error', action.err)
            return state;            

        case 'DELETE_WORKOUT':
            let newWorkouts = state.workouts.filter((workout) => {
                return workout.id !== action.id
            })
            return {
                ...state,
                workouts: newWorkouts
            };

        case 'DELETE_WORKOUT_ERROR':
            console.log('delete workout error ', action.err)
            return state;

        default:
            return state;
    }
}

export default workoutReducer