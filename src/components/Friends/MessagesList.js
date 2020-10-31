import React from 'react'
import DetailSummary from './DetailSummary'
import { Link } from 'react-router-dom'


const MessagesList = ({ details }) => {
    return(
        <div className="messages-list section">
            {details && details.map (detail => {
                return(
                    <Link to={'/messages/'+detail.id} key={detail.id} >
                        <DetailSummary detail = {detail} />
                    </Link>       
                )
            })}
        </div>
    )
}

export default MessagesList