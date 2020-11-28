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

        const { messages, auth, notifications, requested } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>
        
        if (messages) {
            return(
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m5">
                            <FriendsList messages={messages} requested={requested} />
                        </div>
                        <div className="col s12 m6">
                            <ShowMessages notifications={notifications}/>
                        </div>
                        <div className="col s12 m5 offset-m2">
                            <Notifications />
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="dashboard container">
                    <div className="row right">
                        <div className="col s12 m5">
                            <ShowMessages notifications={notifications}/>
                        </div>
                        <div className="col s12 m5">
                            <Notifications />
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state) => {
    const UId = state.firebase.auth.uid;
    if (!UId) {
        var userId = "room1";
    } else {
        userId = UId;
    }

    return{
        messages: state.firestore.ordered.messages,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        userId: userId,
        requested: state.firestore.status.requested.messages
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