export const addMessages = (message,Friend_Fullname) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
        //const friend = message.Friend_Fullname;
        firestore.collection('rooms').doc(userId).collection('messages').add({
            ...message,
            ...Friend_Fullname,
            friendFirstName: profile.firstName,
            friendLastName: profile.lastName,
            userId: userId,
            CreatedAt: new Date()
        }).then (() => {
            dispatch({ type: 'ADD_MESSAGE', message });
        }).catch((err) => {
            dispatch({ type: 'ADD_MESSAGE_ERROR', err });
        })   
    } 
};

export const addDetails = (message,Friend_Fullname) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
        const friend = message.Friend_Fullname;
        firestore.collection('rooms').doc(userId).collection('messages').doc(friend).collection('details').add({
            ...message,
            ...Friend_Fullname,
            friendFirstName: profile.firstName,
            friendLastName: profile.lastName,
            userId: userId,
            CreatedAt: new Date()
        }).then (() => {
            dispatch({ type: 'ADD_DETAIL', message });
        }).catch((err) => {
            dispatch({ type: 'ADD_DETAIL_ERROR', err });
        })   
    } 
};