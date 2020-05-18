export const editProfile = (edit) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const profile = getState().firebase.profile;
        //const authorId = getState().firebase.auth.uid;
        const user = await firebase
        .auth()
        .currentUser
        .updateProfile({
          firstName: profile.firstName,
          lastName: profile.lastName
        }).then(() => {
            dispatch({ type: 'EDITPROFILE_SUCCESS', user});
            console.log("user = " + profile.firstName);
        }).catch((err) => {
            dispatch({ type: 'EDITPROFILE_ERROR', err});
        })

    }
};