const firebase = require('firebase/app')
const functions = require('firebase-functions');
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();
const firestoreDb = firebase.firestore();
const oldRealTimeDb = firebase.database();
const usersRef = firestoreDb.collection('users'); // Get a reference to the Users collection;
const onlineRef = oldRealTimeDb.ref('.info/connected'); // Get a reference to the list of connections
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.helloWorld = functions.https.onRequest((request, response) => {
    //functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello fellas !!");
});

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('notification is added', doc));
})

exports.messageAdded = functions.firestore
    .document('messages/{messageId}')
    .onCreate(doc => {

        const message = doc.data();
        const notification = {
           content: 'sent you a message !', 
           user: `${message.friendFirstName} ${message.friendLastName}`,
           time: admin.firestore.FieldValue.serverTimestamp()
        }

    return createNotification(notification);
});

exports.userOnline = functions.auth.user()
    .onCreate(user => {

        return admin.firestore().collection(`users`)
            .doc(user.uid).get().then(doc => {

                const newUser = doc.data();
                const notification = {
                    content: `Joined the Chat Room`,
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }

            return createNotification(notification);
        })
    });

    
exports.onUserStatusChanged = functions.database
    .ref('/status/{userId}') // Reference to the Firebase RealTime database key
    .onUpdate(event => {
    const usersRef = firestore.collection('/users'); // Create a reference to the Firestore Collection

    return event.data.ref.once('value')
        .then(statusSnapshot => snapShot.val()) // Get the latest value from the Firebase Realtime database
        .then(status => {
        // check if the value is 'offline'
        if (status === 'offline') {
          // Set the Firestore's document's online value to false
            usersRef
                .doc(event.params.userId)
                .set({
                  online: false
                }, { merge: true });
            }
        })
    });

    
onlineRef.on('value', snapshot => {
    // Set the Firestore User's online status to true
    usersRef
        .doc(userId)
        .set({
          online: true,
        }, { merge: true});  
      
    // Let's also create a key in our real-time database
    // The value is set to 'online'
    oldRealTimeDb.ref(`/status/${userId}`).set('online');
});


onlineRef.on('value', snapshot => {
  
    oldRealTimeDb
      .ref(`/status/${userId}`)
      .onDisconnect() // Set up the disconnect hook
      .set('offline') // The value to be set for this key when the client disconnects
      .then(() => {
          // Set the Firestore User's online status to true
          usersRef
            .doc(userId)
            .set({
              online: true,
            }, { merge: true});  
  
          // Let's also create a key in our real-time database
          // The value is set to 'online'
          oldRealTimeDb.ref(`/status/${userId}`).set('online');
      });
    
  });