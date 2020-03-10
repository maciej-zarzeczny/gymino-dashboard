export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'AUTH_REQUEST' })

        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {            
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'AUTH_REQUEST' })

        const firebase = getFirebase();        
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore.collection('trainers').doc(response.user.uid).set({
                name: newUser.name,
                numberOfWorkouts: 0,
                subscribers: 0,
                totalIncome: 0,
                gender: 0,
                gym: false,
                calisthenics: false,
                verified: false
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {            
            dispatch({ type: 'LOGOUT_SUCCESS' })
        });
    }
}