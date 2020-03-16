export const updateUserData = (data) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({ type: 'UPDATE_REQUEST' })
        
        const firebase = getFirebase();
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
        
        if (data.image !== null) {
            const width = 1080;
            const imageName = 'profileImage.jpg';
            
            const reader = new FileReader();
            reader.readAsDataURL(data.image);
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
                        var compressedImage = new File([blob], imageName, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });         

                        var storageRef = firebase.storage().ref();
                        var imageRef = storageRef.child('trainers/' + uid + '/' + imageName);        

                        imageRef.put(compressedImage).then(() => {
                            imageRef.getDownloadURL().then((url) => {
                                return firestore.collection('trainers').doc(uid).update({
                                    name: data.name,            
                                    gender: data.gender,
                                    age: data.age,
                                    weight: data.weight,
                                    height: data.height,
                                    trainingTime: data.trainingTime,
                                    gym,
                                    calisthenics,
                                    verified: true,
                                    supplements: data.supplements,
                                    image: url
                                })
                            }).then(() => {
                                dispatch({ type: 'UPDATE_SUCCESS' })
                            }).catch((err) => {            
                                dispatch({ type: 'UPDATE_ERROR', err })
                            })
                        }).catch((err) => {            
                            dispatch({ type: 'UPDATE_ERROR', err })
                        })
                    }, 'image/jpeg', 0.75);
                }
                reader.onerror = (error) => {
                    
                }
            }                
        } else {
            firestore.collection('trainers').doc(uid).update({
                name: data.name,
                gender: data.gender,
                age: data.age,
                weight: data.weight,
                height: data.height,
                trainingTime: data.trainingTime,
                gym,
                calisthenics,                
                supplements: data.supplements,                
            }).then(() => {
                dispatch({ type: 'UPDATE_SUCCESS' })
            }).catch((err) => {            
                dispatch({ type: 'UPDATE_ERROR', err })
            })        
        }
   }
}