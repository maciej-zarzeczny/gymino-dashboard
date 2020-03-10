const initState = {
    authError: null,
    isLoading: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'AUTH_REQUEST':            
            return {
                ...state,
                authError: null,
                isLoading: true
            }

        case 'LOGIN_SUCCESS':            
            return {
                ...state,
                authError: null,
                isLoading: false
            }

        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: action.err.message,
                isLoading: false
            }

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null,
                isLoading: false
            }

        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.err.message,
                isLoading: false
            }
        
        case 'LOGOUT_SUCCESS':
            return state

        default:
            return state
    }
}

export default authReducer