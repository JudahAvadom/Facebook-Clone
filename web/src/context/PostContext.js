export const initialPostState = {
    posts: [],
    postPagination: {
        currentPage: 0,
        totalPage: 0,
    },
    post: {
        comments: [],
        commentPagination: {
            currentPage: 0,
            totalPage: 0,
        },
    },
}

export const PostReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            }
        default:
            throw new Error(`action type ${action.type} is undefined`)
    }
}