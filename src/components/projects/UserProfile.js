import React, { Component } from 'react'
import { editProfile } from '../../store/actions/editProfileActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class UserProfile extends Component {
    state = {
        FirstName: '',
        LastName: '',
        initials: ''
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.editProfile(this.state)
        //this.props.history.push('/');
    }
    render() {
        const { auth, profile } = this.props;
        console.log(profile);
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Edit your Profile</h5>
                    <div className="input-field">
                        <label htmlFor="FirstName">First Name</label>
                        <input type="text" id="FirstName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="LastName">Last Name</label>
                        <input type="text" id="LastName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Initials</label>
                        <input type="text" id="initials" onChange={this.onChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn orange lighten-1 z-depth-0">Done</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editProfile: (edit) => dispatch(editProfile(edit))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: "profile"}
    ])
  )(UserProfile);
