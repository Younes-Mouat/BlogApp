const initState ={
    projects: [
        {id: '1', title: 'lets do this !!', content: 'blah bla bla'},
        {id: '2', title: '2lets do this !!2', content: 'blah bla bla'},
        {id: '3', title: '3lets do this 3!!', content: 'blah bla bla'}

    ]
}

const projectReducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_POSTE':
            console.log('created poste', action.project)
            return state;
        case 'CREATE_POSTE_ERROR':
            console.log('create poste error', action.err);  
            return state;
        case 'DELETE_PROJECT_SUCCESS':
            console.log('deleted poste', action.id)
            return state;
        case 'DELETE_PROJECT_ERROR':
            console.log('delete poste error', action.err);  
            return state;
        default: 
            return state;      
    }
}

export default projectReducer