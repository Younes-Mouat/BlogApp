import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addDetails } from '../../store/actions/messageAction'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import MessagesList from './MessagesList'


class Messages extends Component {

    state = {
        message: '',
        Friend_Fullname: ''
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addDetails(this.state)
        this.props.history.push('/');
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render(){
        
        const { message, details, auth, friendname } = this.props;
        
        if (!auth.uid) return <Redirect to='/signin' />       
        if (details) {
            this.state.Friend_Fullname = message.Friend_Fullname;
            
            return (
            <div className="container section messages">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{friendname} </span>
                    </div>
                    <div className="card-content">
                        <MessagesList details = {details} />
                    </div>
                    <div className="card action grey lighten-4 grey-text">
                        <form onSubmit={this.handleSubmit} className="white">
                            <div className="input-field">
                                <label htmlFor="message">Enter your message here</label>
                                <input type="text" id="message" onChange={this.handleChange}/>
                            </div>
                            <div className="right input-field">
                                <button className="btn purple dareken-5 z-depth-0">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            )
        } else {
            return (
                <div className="container center white-text">
                    <p>Loading...</p>
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const messages = state.firestore.data.messages;
    const message = messages ? messages[id] : null;   
    const friendname = messages ? message.Friend_Fullname : null;

    const UId = state.firebase.auth.uid;
    if (!UId) {
        var userId = "room1";
    } else {
        userId = UId;
    }
    
    const details = state.firestore.ordered.details;

    return {
        message: message,
        details: details,
        auth: state.firebase.auth,
        userId: userId,
        friendname: friendname
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addDetails: (message) => dispatch(addDetails(message))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { collection: "rooms", doc: props.userId, 
        subcollections: [{ collection: "messages", doc: props.friendname, subcollections: [{ collection: "details" }]}],
        storeAs:"details", orderBy: ['CreatedAt', 'asc']}
    ])
)(Messages);
