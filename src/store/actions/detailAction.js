export const addDetails = (message,Friend_Fullname, secondmessage, friendId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
        const username = profile.firstName + " " + profile.lastName;
        const fId = message.friendId;
        const friend = message.Friend_Fullname;
        message.New_message = true;

        firestore.collection('rooms').doc(userId).collection('messages').doc(friend).collection('details').add({
            ...message,
            ...Friend_Fullname,
            ...secondmessage,
            ...friendId,
            friendFirstName: profile.firstName,
            friendLastName: profile.lastName,
            userId: userId,
            CreatedAt: new Date()
        }).then (() => {
            dispatch({ type: 'ADD_DETAIL', message });
        }).catch((err) => {
            dispatch({ type: 'ADD_DETAIL_ERROR', err });
        })

        message.Friend_Fullname = username;
        message.friendId = userId;

        firestore.collection('rooms').doc(fId).collection('messages').doc(username).collection('details').add({
            ...message,
            ...Friend_Fullname,
            ...secondmessage,
            ...friendId,
            friendFirstName: friend,
            friendLastName: "",
            userId: fId,
            CreatedAt: new Date()
        }).then (() => {
            dispatch({ type: 'ADD_DETAIL', message });
        }).catch((err) => {
            dispatch({ type: 'ADD_DETAIL_ERROR', err });
        })
    }
};