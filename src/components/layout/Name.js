import React, { Component } from 'react'
import { addMessages } from '../../store/actions/messageAction'
import { addDetails } from '../../store/actions/detailAction'
import { connect } from 'react-redux'


class Name extends Component {

    state = {
        message: '',
        Friend_Fullname: '',
        secondmessage: '',
        friendId: '',
        New_message: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.setState({
            message: this.state.message,
            Friend_Fullname: this.state.Friend_Fullname,
            secondmessage: this.state.secondmessage,
            friendId: this.state.friendId,
            New_message: this.state.New_message
        });


        this.props.addMessages(this.state);
        this.props.addDetails(this.state);
        //this.props.history.push('/'); 
        //window.location.reload();
        
    }

    render() {
        this.state.message = "Say Hi to your new friend ";
        this.state.Friend_Fullname =  this.props.name;
        this.state.secondmessage = "Say Hi to your new friend ";

        const { username, lenght } = this.props;

        for (let index = 0; index < lenght; index++) {
            const user = username ? username[index].firstName + ' ' + username[index].lastName : null;
            const id = username ? username[index].friendId : null;
            if (user == this.props.name) {
                this.state.friendId = id;
            }
        }

        /*if (lenght2 != 0) {
            for (let index = 0; index < lenght2; index++) {
            const nameId = messages ? messages[index].friendId : null;
            if (nameId == this.state.friendId && firebase.auth().currentUser.uid == this.state.friendId) {
                this.state.access_denied = true;
            }
            }
        }*/

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


const mapStateToProps = (state) => {

    const username = state.firestore.ordered.users;
    const length = username ? state.firestore.ordered.users.length : null;

    return{
        username: username,
        lenght: length
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addMessages: (message) => dispatch(addMessages(message)),
        addDetails: (message) => dispatch(addDetails(message))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Name)