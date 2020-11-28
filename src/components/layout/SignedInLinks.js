import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import {Modal, Button, Icon} from 'react-materialize'
import firebase from 'firebase/app'
import NameContainer  from './NameContainer'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'



class SignedInLinks extends Component{

    state = {
        users: [],
        searchTerm: ''
    }
    

    editSearchTerm = (e) => {
        this.setState({searchTerm: e.target.value})
    }

    dynamicSearch = () => {
        /*const events =  firebase.firestore().collection('users');
            events.get().then((snapshot) => {
                snapshot.forEach(doc => {
             this.setState(prevState => ({
         users: [...prevState.users,doc.data().firstName + ' ' + doc.data().lastName],
         friendIds: [...prevState.friendIds,doc.data().friendId]
        }));  
        return;    
                })
             })*/ 
        return this.state.users.filter(name => name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
        
    }
    
    render(){
        
        const { profile, username, lenght } = this.props;

        if (firebase.auth().currentUser.displayName != null){

            profile.lastName = firebase.auth().currentUser.displayName;
            profile.firstName = "";
            profile.initials = firebase.auth().currentUser.displayName[0] + firebase.auth().currentUser.displayName[1];
        }

        for (let index = 0; index < lenght; index++) {
            const user = username ? username[index].firstName + ' ' + username[index].lastName : null;
            const friendId = username ? username[index].friendId : null;

            if (friendId != firebase.auth().currentUser.uid) {
                this.state.users[index] = user;
             //this.state.friendIds[index] = friendId; 
             }
        }

    return(
            <div>
            <ul className="right">
                <li>
                    <Modal header='Sent friend request !'
                        trigger={<Button waves='light'>Add Friends<Icon right>search</Icon></Button>}>
                        <div className="input-field">
                            <label htmlFor="fullname">Search for a name !</label>
                            <input type="text" value = {this.state.searchTerm} onChange={this.editSearchTerm} /> 
                            <NameContainer users = {this.dynamicSearch()} />   
                        </div>     
                    </Modal>
                </li>
                <li><a onClick={this.props.signOut}>Log Out</a></li>
                <li><NavLink to='/' className="btn btn-floating orange lighten-1">{profile.initials}</NavLink></li>
                <li>
                    <img
                        src={firebase.auth().currentUser.photoURL}
                        style={{width: 40, height: 40, borderRadius: 40/ 2}}
                    /> 
                </li>
            </ul>

        </div>  
    )
    }
}



const mapStateToProps = (state) => {
    const username = state.firestore.ordered.users;
    const length2 = username ? state.firestore.ordered.users.length : null;
    return{
        profile: state.firebase.profile,
        username: username,
        lenght: length2
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => dispatch(signOut())
    }
}

export default compose(
    firestoreConnect(() => ['users']),
    connect(mapStateToProps, mapDispatchToProps)
)(SignedInLinks)