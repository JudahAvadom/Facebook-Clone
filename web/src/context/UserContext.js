export const initialUserState = {
    currentUser: null,
    users: [],
    socketio: null,
    sendedFriendRequests: [],
    receivedFriendRequests: [],
    isLoggedIn: false,
    recentAccounts: [],
    selectedUserProfile: null,
}

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_RECENT_ACCOUNT':
            let account = state.recentAccounts.find((account) => account.id == action.payload.id,)
            if (account) {
                return {
                    ...state,
                    recentAccounts: [...state.recentAccounts],
                }
            } else {
                let accounts = []
                accounts = localStorage.accounts ? JSON.parse(localStorage.accounts) : []
                accounts.push(action.payload)
                localStorage.setItem('accounts', JSON.stringify(accounts))
                return {
                  ...state,
                recentAccounts: [action.payload, ...state.recentAccounts],
            }
        }
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