import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { Link } from 'react-router-dom'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'

class SignUp extends Component {
  state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        initials: '',
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
          console.log("user", user)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/' />  

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="black-text text-lighten-4">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field center">
                        <button className="btn orange lighten-1 z-depth-0">Sign Up</button>
                        <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                        <div className="red-text center">
                            { authError ?  <p>{ authError }</p> : null}
                        </div>
                    </div>
                    <div className="input-field center">
                        <Link to='/signin/'>Already have an account ?</Link>
                    </div>
                </form>
            </div>
    )
  }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => dispatch(signUp(newUser)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
