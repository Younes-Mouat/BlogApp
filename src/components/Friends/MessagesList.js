import React from 'react'
import DetailSummary from './DetailSummary'
import { Link } from 'react-router-dom'


const MessagesList = ({ details}) => {
    return(
        <div className="messages-list section">
            {details && details.map (detail => {
                return(
                    <DetailSummary detail = {detail} />       
                )
            })}
        </div>
    )
}

export default MessagesList