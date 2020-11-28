import React from 'react'
import moment from 'moment' 


const MessageSummary = ({ message }) => {

    var newmsg = message.New_message;
   
    if (newmsg) {
            return(
                <div className="card z-depth-0 message-summary">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{message.Friend_Fullname}</span>
                        <p>{message.message}</p>
                        <ul>
                            <li className="right orange-text">{ moment(message.CreatedAt.toDate()).calendar() }</li>
                        </ul>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="card z-depth-0 message-summary">
                    <div className="card-content grey-text text-darken-3">
                        <li className="right btn btn-floating orange lighten-1">New</li>
                        <span className="card-title">{message.Friend_Fullname}</span>
                        <p>{message.message}</p>
                        <ul>
                            <li className="right orange-text">{ moment(message.CreatedAt.toDate()).calendar() }</li>
                        </ul>
                    </div>
                </div>
            )
        }
}

export default MessageSummary