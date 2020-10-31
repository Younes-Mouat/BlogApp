const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'LOGIN_ERROR':
            return{
                ...state,
                authError: 'sign in failed'
            } 
        case 'SIGNOUT_SUCCESS' :
            return state
        case 'SIGNUP_SUCCESS' :
            return{
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR' :
            return{
                ...state,
                authError: 'sign up failed'
            }    
        default :
        return state;
    }
} 

export default authReducer