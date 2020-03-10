export const updateUserData = (data) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'UPDATE_REQUEST' })

        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;

        var gym = false;
        var calisthenics = false;
        if (data.trainingType === '1') {
            gym = true;
        } else if (data.trainingType === '2') {
            calisthenics = true;
        } else {
            gym = true;
            calisthenics = true;
        }

        firestore.collection('trainers').doc(uid).update({
            name: data.name,            
            gender: data.gender,
            age: data.age,
            weight: data.weight,
            height: data.height,
            trainingTime: data.trainingTime,
            gym,
            calisthenics,
            verified: true
        }).then(() => {
            dispatch({ type: 'UPDATE_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'UPDATE_ERROR', err })
        })
    }
}