export const initialUserState = {
    currentUser: null,
    isLoggedIn: false,
    users: [],
    sendedFriendRequests: [],
    recentAccounts: [],
    selectedUserProfile: null,
}

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'LOGOUT_USER':
            if (localStorage.token) {
                localStorage.removeItem('token')
            }
            return {
                ...state,
                currentUser: null,
                isLoggedIn: false,
                users: [],
                sendedFriendRequests: [],
                receivedFriendRequests: [],
                selectedUserProfile: null,
        }
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload,
                isLoggedIn: true,
            }
        default:
            throw new Error(`action type ${action.type} is undefined`)
    }
}