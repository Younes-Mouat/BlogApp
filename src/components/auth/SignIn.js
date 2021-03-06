import React, { Component } from 'react'
import { signIn } from '../../store/actions/authActions';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        isSignedIn: false
    }

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          //firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccess: () => false
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ isSignedIn: !!user })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' />

    return (
      <div className="container">
        <form onSubmit = {this.handleSubmit} className="white">
            <h5 className="black-text text-darken-3">Sign In</h5>
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={this.handleChange}/>    
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={this.handleChange}/>    
            </div>
            <div className="input-field center">
                <button className="btn orange lighten-1 z-depth-0">Login</button>
                <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                <div className="red-text center">
                    { authError ? <p>{ authError }</p> : null }
                </div>
            </div> 
            <div className="input-field center">
                <p>Forgot your password ?</p>
            </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (credentials) => dispatch(signIn(credentials)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
