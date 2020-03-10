const initState = {
    isLoading: false,
    updateError: null
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return {
                ...state,
                isLoading: true
            }

        case 'UPDATE_SUCCESS':
            return {
                ...state,                
                isLoading: false,
                updateError: null
            }

        case 'UPDATE_ERROR':
            return {
                ...state,                
                isLoading: false,
                updateError: action.err.message
            }

        default:
            return state
    }
}

export default userReducer