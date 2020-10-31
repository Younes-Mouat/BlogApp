import React from 'react'
import moment from 'moment'


const ShowMessages = (props) => {
    
    const { notifications } = props;
    return(
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Notifications</span>
                    <ul className="notifications">
                        { notifications && notifications.map(item => {
                            return (
                                <li key={item.id}>
                                    <span className="green-text">{item.user} </span>
                                    <span>{item.content}</span>
                                    <div className="orange-text lighten-1 note-date right">
                                        {moment(item.time.toDate()).fromNow()}
                                    </div>
                                </li>
                            )
                        }) }
                    </ul>
                </div> 
            </div>
        </div>
    )
} 

export default ShowMessages