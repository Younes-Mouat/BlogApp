import React from 'react'
import firebase from 'firebase/app'


const Notifications = (props) => {
const user = firebase.auth().currentUser;


/*if (user) {
  // User is signed in.
  const name = user.displayName;
    return(
            <div className="section">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">Active Friends</span>
                        <ul className="notifications">
                        <li>
                            <span className="green-text">{name}</span>
                            <span>is now Online</span>
                        </li>
                        </ul>
                    </div> 
                </div>
            </div>
    )

} else {*/
  // No user is signed in.
  return(
    <div className="section">
        <div className="card z-depth-0">
            <div className="card-content">
                <span className="card-title">Active Friends</span>
                <ul className="notifications">
                    <li>No active friends</li>
                </ul>
            </div> 
        </div>
    </div>
)

}
    
//} 

export default Notifications