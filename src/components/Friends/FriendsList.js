import React from 'react'
import MessageSummary from './MessageSummary'
import { Link } from 'react-router-dom'


const FriendsList = ({ messages , requested}) => {
    return(
        <div className="friends-list section">
            {messages && messages.map (message => {
                return(
                    <Link to={'/messages/'+message.id} key={message.id} >
                        <MessageSummary message = {message} requested = {requested} />
                    </Link>   
                )
            })}
        </div>
    )
}

export default FriendsList