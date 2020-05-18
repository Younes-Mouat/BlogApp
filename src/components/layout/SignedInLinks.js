import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import firebase from 'firebase'

const SignedInLinks = (props) => {
    
    if (firebase.auth().currentUser.displayName != null){

        props.profile.firstName = firebase.auth().currentUser.displayName;
        props.profile.lastName = "";
        props.profile.initials = firebase.auth().currentUser.displayName[0];
    }

    return(
        
        <ul className="right">
            <li><NavLink to='/create'>Add Poste</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/profile' className='btn btn-floating orange lighten-1'>
                    {props.profile.initials}
            </NavLink></li>
            <li><NavLink to='/profile'>{props.profile.firstName} {props.profile.lastName}</NavLink></li>
            <img
                src={firebase.auth().currentUser.photoURL}
                style={{width: 40, height: 40, borderRadius: 40/ 2}}
            />    
        </ul>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)