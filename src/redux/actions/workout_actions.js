export const getWorkouts = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('workouts').get().then((querySnapshot) => {
            let workouts = []            
            querySnapshot.forEach(doc => {                
                workouts.push({
                    ...doc.data(),
                    id: doc.id
                })
            });            
            dispatch({ type: 'GET_WORKOUTS', workouts })
        }).catch((err) => {
            dispatch({ type: 'GET_WORKOUTS_ERROR', err })
        });
    }
}

export const createWorkout = (workout) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();                
        firestore.collection('workouts').add({
            ...workout,
            amount: 0,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_WORKOUT', workout })
        }).catch((err) => {
            dispatch({ type: 'CREATE_WORKOUT_ERROR', err })
        });
    } 
}

export const deleteWorkout = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('workouts').doc(id).delete().then(() => {
            dispatch({ type: 'DELETE_WORKOUT', id })
        }).catch((err) => {
            dispatch({ type: 'DELETE_WORKOUT_ERROR', err })
        })
    }
}