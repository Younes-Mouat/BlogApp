import React, { Component } from 'react'
import { addMessages, addDetails } from '../../store/actions/messageAction'
import { connect } from 'react-redux'


class Name extends Component {

    state = {
        message: '',
        Friend_Fullname: '',
        //friendId: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.setState({
            message: this.state.message,
            Friend_Fullname: this.state.Friend_Fullname,
            //friendId: this.props.friendId
        });
        
        this.props.addMessages(this.state);
        this.props.addDetails(this.state);
        //this.props.history.push('/');
    }

    render() {
        this.state.message = "Say Hi to your new friend " + this.props.name;
        this.state.Friend_Fullname =  this.props.name;

        return(
            <div className="card z-depth-0">
            <div className="card-content grey-text text-darken-3">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field"> 
                        <span className="card-title">{ this.props.name}</span>
                        <button className="btn orange lighten-1 z-depth-0 right">Send Request</button> 
                    </div>    
                </form> 
            </div>
        </div>       
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addMessages: (message) => dispatch(addMessages(message)),
        addDetails: (message) => dispatch(addDetails(message))
    }
}

export default connect(null,mapDispatchToProps)(Name)