import React, { Component } from 'react'
import Notifications from './OnlineStatus'
import FriendsList from '../Friends/FriendsList'
import ShowMessages from './ShowMessages'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'


class Dashboard extends Component {
    render(){

        const { messages, auth, notifications } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>
        
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m5">
                        <FriendsList messages={messages}/>
                    </div>
                    <div className="col s12 m6 offset-m1">
                        <ShowMessages notifications={notifications}/>
                    </div>
                    <div className="col s12 m5 offset-m2">
                        <Notifications />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const UId = state.firebase.auth.uid;
    if (!UId) {
        var userId = "room1";
    } else {
        userId = UId;
    }

    /*const msgs = state.firestore.ordered.messages;
    const length2 = msgs ? state.firestore.ordered.messages.length : null;
    const friendname = msgs ? msgs[length2 - 1].Friend_Fullname : null;*/

    return{
        messages: state.firestore.ordered.messages,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        userId: userId,
        //friendname: friendname
    }   
}

export default compose(
    connect(mapStateToProps), 
    firestoreConnect((props) => [
        { collection: "rooms", doc: props.userId, 
        subcollections: [{ collection: "messages" }],
        storeAs:"messages", orderBy: ['CreatedAt', 'desc']},
        { collection: "notifications", limit: 5, orderBy: ['time', 'desc']}
    ])
)(Dashboard);