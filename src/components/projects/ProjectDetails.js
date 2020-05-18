import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
//import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'
import { Link } from 'react-router-dom'

const handleClick = (e, id, deleteProject) => {
    e.preventDefault()
    deleteProject(id)
    console.log(id)
}

const ProjectDetails = (props) => {
    const { project, auth } = props;
    //if (!auth.uid) return <Redirect to='/signin' />
    if (project) {
        return(
            <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">{ project.title }</span>
                    <p>{ project.content }</p>
                    <br/>
                    <p>{project.image && <img src={project.imageURL} alt="description"/>}</p>
                    <br/>
                    <p>{project.imageURL && <a href={project.imageURL}>Download File</a>}</p>
                </div>
                <div className="card-action orange lighten-4 grey-text">
                    <div>Posted by { project.authorLastName} { project.authorFirstName }</div>
                    <div>{moment(project.createdAt.toDate()).calendar()}</div>
                </div>
                <br/>
                <Link to='/'>
                <button className="btn orange lighten-1 z-depth-0" onClick={(e) => handleClick(e, props.id, props.deleteProject)}>
                    Delete
                </button>
                </Link>
            </div>
        </div>
        )  
    } else {
        return (
            <div className="container center">
                <p>Loading Poste...</p>
            </div>
        )
    }
    
}

const mapStateToProps = (state, ownProps) => {
    //console.log(state);
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return{
        project: project,
        id: id,
        auth: state.firebase.auth
    }
}

const matchDispatchToProps = (dispatch) => {
    return {
        deleteProject: (id) => {
            //e.preventDefault()
            dispatch(deleteProject(id))
        }
    }
}

export default compose(
    connect(mapStateToProps, matchDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails)
