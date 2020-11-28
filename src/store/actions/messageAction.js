export const addMessages = (message,Friend_Fullname, secondmessage, friendId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        const firebase = getFirebase();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;
        const msg = getState().firestore.ordered.messages;
        var access_denied = false;
        const username = profile.firstName + " " + profile.lastName;
        const sentmsg = message.message;
        const fId = message.friendId;
        const fname = message.Friend_Fullname;
        message.New_message = true;


        for (let index = 0; index < msg.length; index++) {
            if (msg[index].friendId == fId) {
                access_denied = true
            }            
        }


        if (access_denied === false) {
           firestore.collection('rooms').doc(userId).collection('messages').add({
            ...message,
            ...Friend_Fullname,
            ...secondmessage,
            ...friendId,
            friendFirstName: profile.firstName,
            friendLastName: profile.lastName,
            userId: userId,
            CreatedAt: new Date()
        }).then (() => {
            dispatch({ type: 'ADD_MESSAGE', message });
        }).catch((err) => {
            dispatch({ type: 'ADD_MESSAGE_ERROR', err });
        })

        message.message = message.secondmessage + " " + profile.firstName + " " + profile.lastName;
        message.Friend_Fullname = username;
        message.friendId = userId;

        firestore.collection('rooms').doc(fId).collection('messages').add({
            ...message,
            ...Friend_Fullname,
            ...secondmessage,
            ...friendId,
            friendFirstName: fname,
            friendLastName: "",
            userId: fId,
            CreatedAt: new Date()
        }).then (() => {
            dispatch({ type: 'ADD_MESSAGE', message });
        }).catch((err) => {
            dispatch({ type: 'ADD_MESSAGE_ERROR', err });
        }) 

        message.message = sentmsg;
        message.Friend_Fullname = fname;
        message.friendId = fId;
        
        if (firebase.auth().currentUser.displayName) {
            firestore.collection('users').doc(firebase.auth().currentUser.uid).set({
                firstName: firebase.auth().currentUser.displayName,
                lastName: "",
                initials: firebase.auth().currentUser.displayName[0] + firebase.auth().currentUser.displayName[1],
                friendId: firebase.auth().currentUser.uid,
                online: false
            }).then(() => {
            dispatch({ type:'SIGNUP_SUCCESS' })
            }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR' }, err)
            })
        }
    
    }
        
    } 
};

export const deleteFriendMessage = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        
        firestore.collection('rooms').doc(userId).collection('messages').doc(id)
            .delete()
            .then(() => {
            dispatch({ type: 'DELETE_MESSAGE', payload: id })
            }).catch(err => {
            dispatch({ type: 'DELETE_MESSAGE_ERROR', payload: err })
        })
    }
};

export const deleteFriendDetails = (message) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        const profile = getState().firebase.profile;
        const fId = message.friendId;
        const fname = message.Friend_Fullname;
        const username = profile.firstName + " " + profile.lastName;

        console.log(message);

        firestore.collection('rooms').doc(userId).collection('messages').doc(fname).delete()
        .then(() => {
            dispatch({ type: 'DELETE_MESSAGE'});
        }).catch(err => {
          dispatch({ type: 'DELETE_MESSAGE_ERROR',err });
        })

        firestore.collection('rooms').doc(fId).collection('messages').doc(username).delete()
        .then(() => {
            dispatch({ type: 'DELETE_MESSAGE'});
        }).catch(err => {
          dispatch({ type: 'DELETE_MESSAGE_ERROR',err });
        })
    }
};