import React, { Component } from 'react'
import { createProject } from '../../store/actions/projectActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader'
import firebase from 'firebase'
import 'firebase/storage'


class CreateProject extends Component {
    state = {
        title: '',
        content: '',
        image: '',
        imageURL: '',
        progress: 0
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
        this.props.createProject(this.state)
        this.props.history.push('/');
    }

    handleUploadStart = () => {
        this.setState({
        progress: 0
        })
    }    
    
      handleUploadSuccess = filename => {
    
        this.setState({
          image: filename,
          progress: 100,
        })

        firebase.storage().ref('files').child(filename)
        .getDownloadURL()
        .then(url => this.setState({
            imageURL: url
        }))
    };

    handleProgress = progress =>
    this.setState({
      progress: progress
    });

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Add a New Poste</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Description</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div>
                        <FileUploader
                            accept=""
                            name='image'
                            randomizeFilename
                            storageRef={firebase.storage().ref('files')}
                            onUploadStart={this.handleUploadStart}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                    <div>
                        <br/>
                        <label> Progress: </label>
                        <p>{this.state.progress}</p>
                        <br/>
                        <br/>    
                        {this.state.image && <img src={this.state.imageURL} alt="description"/>}
                        <br/>
                        <br/>
                        {this.state.imageURL && <a href={this.state.imageURL}>Download File</a>}
                    </div>
                    </div>
                    <div className="input-field">
                        <button className="btn orange lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)

/*
<CustomUploadButton
                            accept=""
                            storageRef={firebase.storage().ref('images')}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                            style={{backgroundColor: 'orange', color: 'grey', padding: 10, borderRadius: 4}}
                        >
                        Choose a File
                    </CustomUploadButton>
*/
