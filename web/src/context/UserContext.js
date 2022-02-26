import { filterArray } from '../utils/FilterArray'

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
        case 'FRIEND_LOGOUT':
            let id1_friend = state.currentUser.friends.findIndex((user) => user.id == action.payload)
            if (id1_friend !== -1) {
                state.currentUser.friends[id1_friend].active = false
            }
            return {
                ...state,
            }
        case 'RECENT_ACCOUNTS':
            const accounts = filterArray(action.payload)
            return {
                ...state,
                recentAccounts: accounts,
            }
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
        case 'SET_SOCKETIO':
            return {
                  ...state,
                  socketio: action.payload,
            }
        default:
            throw new Error(`action type ${action.type} is undefined`)
    }
}