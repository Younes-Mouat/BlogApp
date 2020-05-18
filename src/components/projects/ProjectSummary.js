import React from 'react'
import moment from 'moment'

const ProjectSummary = ({project}) => {
    return(
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
    <span className="card-title">{project.title}</span>
                <p>Posted by { project.authorFirstName } { project.authorLastName }</p>
    <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
    <span className="orange-text"> Enter here to download the file</span>
            </div>
        </div>
    )
}

export default ProjectSummary