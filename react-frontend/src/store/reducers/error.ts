
export default (state: string | null = null, action: { type: string; message: string}) => {
    if (action.type === 'CLEAR_ERROR') {
        return null
    } else if (action.type.match(/ERROR/)) {
        return action.message
    }
    return state
}