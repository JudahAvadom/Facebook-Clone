export const initialUIState = {
    message: null,
    drawer: false,
    darkMode: false,
    notifications: [],
    mdScreen: false,
    drawer: false,
}

export const UIReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_SCREEN':
            return {
                ...state,
                mdScreen: action.payload,
        }
        case 'SET_DRAWER':
            return {
                ...state,
                drawer: action.payload,
        }
        case 'SET_NOTIFICATIONS':
            return {
                ...state,
                notifications: action.payload,
        }
        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.payload,
            }
        case 'SET_DARK_MODE':
            return {
                ...state,
                darkMode: action.payload,
            }
        default:
            throw new Error(`action type ${action.type} is undefined`);
    }
}