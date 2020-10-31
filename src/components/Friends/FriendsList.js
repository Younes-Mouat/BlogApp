import React from 'react'
import MessageSummary from './MessageSummary'
import { Link } from 'react-router-dom'


const FriendsList = ({ messages }) => {
    return(
        <div className="friends-list section">
            {messages && messages.map (message => {
                return(
                    <Link to={'/messages/'+message.id} key={message.id} >
                        <MessageSummary message = {message} />
                    </Link>
                    
                )
            })}
        </div>
    )
}

export default FriendsList