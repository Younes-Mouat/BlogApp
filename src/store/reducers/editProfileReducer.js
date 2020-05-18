const initState ={
    profiles: [
        {id: '1', firstName: 'me 1', lastName: 'blah bla bla'},
        {id: '2', firstName: 'Two', lastName: 'blacxvb'},
        {id: '3', firstName: 'Three', lastName: 'blfa'}

    ]
}

const editProfileReducer = (state=initState, action) => {
    switch(action.type) {
        case 'EDITPROFILE_SUCCESS':
            //console.log('edited profile', action.edit)
            return{
                ...state,
                user: action.user
            };
        case 'EDITPROFILE_ERROR':
            //console.log('edit profile error', action.err);  
            return {
                ...state,
                editError: action.error
            };
        default: 
            return state;      
    }
}

export default editProfileReducer