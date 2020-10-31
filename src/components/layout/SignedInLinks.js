import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import {Modal, Button, Icon} from 'react-materialize'
//import firebase from 'firebase/app'
import NameContainer  from './NameContainer'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'



class SignedInLinks extends Component{

    state = {
        users: [],
        friendIds: [],
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

    /*dynamicSearch2 = () => {
        return this.state.friendIds.filter(name => name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
    }*/
    
    render(){
        
        const { profile, username, lenght } = this.props;

        for (let index = 0; index < lenght; index++) {
            const user = username ? username[index].firstName + ' ' + username[index].lastName : null;
            //const friendId = username ? username[index].id : null;

            this.state.users[index] = user;
            //this.state.friendIds[index] = friendId;
        }
        
        //console.log(this.state.friendIds);

    return(
            <div>
            <ul className="right">
                <li>
                    <Modal header='Sent friend request !'
                        trigger={<Button waves='light'>Add Friends<Icon right>search</Icon></Button>}>
                        <div className="input-field">
                            <label htmlFor="fullname">Search for a name !</label>
                            <input type="text" value = {this.state.searchTerm} onChange={this.editSearchTerm} /> 
                            <NameContainer users = {this.dynamicSearch()}/>   
                        </div>     
                    </Modal>
                </li>
                <li><a onClick={this.props.signOut}>Log Out</a></li>
                <li><NavLink to='/' className="btn btn-floating grey darken-1">{profile.initials}</NavLink></li>
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