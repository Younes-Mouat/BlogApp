import React from 'react'
import moment from 'moment' 


const DetailSummary = ({detail}) => {
    return(
        <div className="card z-depth-0 message-summary">
            <div className="card-content grey-text text-darken-3">
            <p> {detail.message} </p>
                <div className="card action grey lighten-4 grey-text">
                    <ul className="right">
                        <li className="orange-text">{ moment(detail.CreatedAt.toDate()).calendar() }</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DetailSummary
                        