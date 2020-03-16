export const getWorkouts = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'START_WORKOUTS_REQUEST' })
        
        const uid = getState().firebase.auth.uid;
        const firestore = getFirestore();                    

        firestore.collection('trainers').doc(uid).collection('workouts').get().then((querySnapshot) => {
            let workouts = []
            querySnapshot.forEach(doc => {
                workouts.push({
                    ...doc.data(),
                    id: doc.id,
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
        dispatch({ type: 'START_WORKOUTS_REQUEST' })
        
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        
        const width = 1080;
        
        const reader = new FileReader();
        reader.readAsDataURL(workout.image);
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
                    var compressedImage = new File([blob], Date.now() + workout.image.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });         
                                        
                    var storageRef = firebase.storage().ref();
                    var imageRef = storageRef.child('trainers/' + uid + '/workouts/' + compressedImage.name);

                    imageRef.put(compressedImage).then(() => {
                        imageRef.getDownloadURL().then((url) => {
                            workout.amount = 0;
                            workout.createdAt = firestore.Timestamp.fromDate(new Date());
                            workout.imageName = compressedImage.name;
                            workout.image = url;                            

                            return firestore.collection('trainers').doc(uid).collection('workouts').add(workout)
                        }).then((response) => {
                            workout.id = response.id

                            const increment = firestore.FieldValue.increment(1);
                            firestore.collection('trainers').doc(uid).update({ numberOfWorkouts: increment });

                            ownProps.history.push('/workouts')
                            dispatch({ type: 'CREATE_WORKOUT_SUCCESS', workout })
                        }).catch((err) => {
                            dispatch({ type: 'CREATE_WORKOUT_ERROR', err })
                        })
                    }).catch((err) => {
                        dispatch({ type: 'CREATE_WORKOUT_ERROR', err })
                    });               

                }, 'image/jpeg', 0.75);
            }
            reader.onerror = error => {                
                dispatch({ type: 'CREATE_WORKOUT_ERROR', error })
            }
        }        
    } 
}

export const deleteWorkout = (id, imageName) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'START_WORKOUTS_REQUEST' })

        const uid = getState().firebase.auth.uid;        
        const firestore = getFirestore()
        const firebase = getFirebase();
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child('trainers/' + uid + '/workouts/' + imageName);

        imageRef.delete().then(() => {
            return firestore.collection('trainers').doc(uid).collection('workouts').doc(id).delete()                
        }).then(() => {
            dispatch({ type: 'DELETE_WORKOUT_SUCCESS', id })
        }).catch((err) => {            
            dispatch({ type: 'DELETE_WORKOUT_ERROR', err })
        })
    }
}