export const fetchExercises = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'START_EXERCISES_REQUEST' })

        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;

        firestore.collection('trainers').doc(uid).collection('exercises').limit(6).get().then((querySnapshot) => {
            let exercises = []
            let lastExercise = querySnapshot.docs[querySnapshot.docs.length - 1]

            querySnapshot.forEach(doc => {
                exercises.push({
                    ...doc.data(),
                    id: doc.id
                })
            });
            
            dispatch({ type: 'FETCH_EXERCISES_SUCCESS', exercises, lastExercise })
        }).catch((err) => {
            dispatch({ type: 'FETCH_EXERCISES_ERROR', err })
        })
    }
}

export const fetchMoreExercises = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'START_EXERCISES_MORE_REQUEST' })
        
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const lastExercise = getState().exercise.lastExercise;
        
        firestore.collection('trainers').doc(uid).collection('exercises').startAfter(lastExercise).limit(6).get().then((querySnapshot) => {
            let exercises = []
            let lastExercise = querySnapshot.docs[querySnapshot.docs.length - 1]
            
            querySnapshot.forEach(doc => {
                exercises.push({
                    ...doc.data(),
                    id: doc.id
                })
            });
            dispatch({ type: 'FETCH_MORE_EXERCISES_SUCCESS',  exercises, lastExercise })
        }).catch((err) => {
            dispatch({ type: 'FETCH_MORE_EXERCISES_ERROR', err })
        })
    }
}

export const addExercise = (exercise) => {
    return(dispatch, getState, { getFirestore, getFirebase }) => {
        dispatch({ type: 'START_EXERCISES_REQUEST' })

        const firestore = getFirestore();
        const firebase = getFirebase();
        const uid = getState().firebase.auth.uid

        const width = 1080;
        
        const reader = new FileReader();
        reader.readAsDataURL(exercise.image);
        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const elem = document.createElement('canvas');
                const scaleFactor = width / img.width;

                elem.width = width;
                elem.height = img.height * scaleFactor;
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
                ctx.canvas.toBlob((blob) => {
                    var compressedImage = new File([blob], Date.now() + exercise.image.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });         
                    
                    var storageRef = firebase.storage().ref();
                    var imageRef = storageRef.child('trainers/' + uid + '/exercises/' + compressedImage.name);

                    imageRef.put(compressedImage).then(() => {
                        imageRef.getDownloadURL().then((url) => {                                                        
                            exercise.imageName = compressedImage.name;
                            exercise.image = url;
                            exercise.createdAt = firestore.Timestamp.fromDate(new Date());

                            return firestore.collection('trainers').doc(uid).collection('exercises').add(exercise)
                        }).then((response) => {
                            exercise.id = response.id                               
                            dispatch({ type: 'ADD_EXERCISE_SUCCESS', exercise })
                        }).catch((err) => {
                            dispatch({ type: 'ADD_EXERCISE_ERROR', err })
                        })
                    }).catch((err) => {
                        dispatch({ type: 'ADD_EXERCISE_ERROR', err })
                    });               

                }, 'image/jpeg', 0.75);
            }
            reader.onerror = error => {                
                dispatch({ type: 'ADD_EXERCISE_ERROR', error })
            }
        }
    }
}

export const deleteExercise = (id, imageName) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'START_EXERCISES_REQUEST' })

        const uid = getState().firebase.auth.uid;        
        const firestore = getFirestore()
        const firebase = getFirebase();
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child('trainers/' + uid + '/exercises/' + imageName);

        imageRef.delete().then(() => {
            return firestore.collection('trainers').doc(uid).collection('exercises').doc(id).delete()
        }).then(() => {
            dispatch({ type: 'DELETE_EXERCISE_SUCCESS', id })
        }).catch((err) => {            
            dispatch({ type: 'DELETE_EXERCISE_ERROR', err })
        })
    }
}