import React from 'react'
import moment from 'moment' 
import firebase from 'firebase/app'


const DetailSummary = ({detail}) => {
    if (!detail.friendLastName) {
        return(
            <div className="card-panel z-depth-0 grey lighten-3">
            <div className="card-content">
            <ul>
                <li className="left black-text"><p> {detail.message} </p></li>
                <div className="card action grey lighten-4 grey-text">
                    <ul className="right">
                        <li className="orange-text text-lighten-1">{ moment(detail.CreatedAt.toDate()).calendar() }</li>
                        <li></li>
                    </ul>
                </div>
            </ul>  
            </div>
        </div>
    )
    } else {
        return(
            <div className="card-panel z-depth-0 orange lighten-1">
                <div className="card-content">
                <ul>
                    <li className="right white-text bold"><p> {detail.message} </p></li>
                    <div className="card action grey lighten-4 grey-text">
                        <ul className="left">
                            <li className="grey-text text-lighten-2">{ moment(detail.CreatedAt.toDate()).calendar() }</li>
                            <li></li>
                        </ul>
                    </div>
                </ul>  
                </div>
            </div>
        )
    }  
}

export default DetailSummary
                        