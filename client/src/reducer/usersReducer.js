export const initialState = []

export const usersReducer = (state, action) => {
    if (action.type === "USERS") {
        return action.payload;
    }
    if (action.type === "CLEAR") {
        return null;
    }
    return state;
}