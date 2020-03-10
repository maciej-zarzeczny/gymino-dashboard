export const getWorkouts = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'START_REQUEST' })
        
        const uid = getState().firebase.auth.uid;
        const firestore = getFirestore();
        firestore.collection('trainers').doc(uid).collection('workouts').get().then((querySnapshot) => {
            let workouts = []            
            querySnapshot.forEach(doc => {                
                workouts.push({
                    ...doc.data(),
                    id: doc.id
                })
            });            
            dispatch({ type: 'GET_WORKOUTS_SUCCESS', workouts })
        }).catch((err) => {
            dispatch({ type: 'GET_WORKOUTS_ERROR', err })
        });
    }
}

export const createWorkout = (workout, ownProps) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {  
        dispatch({ type: 'START_REQUEST' })

        const uid = getState().firebase.auth.uid;
        const firestore = getFirestore();
        workout.amount = 0;
        workout.createdAt = firestore.Timestamp.fromDate(new Date());
        firestore.collection('trainers').doc(uid).collection('workouts').add(workout).then((response) => {
            workout.id = response.id
            ownProps.history.push('/workouts')
            dispatch({ type: 'CREATE_WORKOUT_SUCCESS', workout })
        }).catch((err) => {
            dispatch({ type: 'CREATE_WORKOUT_ERROR', err })
        });
    } 
}

export const deleteWorkout = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'START_REQUEST' })
        
        const firestore = getFirestore()
        firestore.collection('workouts').doc(id).delete().then(() => {
            dispatch({ type: 'DELETE_WORKOUT_SUCCESS', id })
        }).catch((err) => {
            dispatch({ type: 'DELETE_WORKOUT_ERROR', err })
        })
    }
}