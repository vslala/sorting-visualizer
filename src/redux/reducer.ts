export interface AppState {
    bars: Array<any>
}

const initialState = {
    bars: []
}

const sortReducer = (state: any, action: any) => {
    switch (action.type) {
        case "REFRESH":
        case "SORT": {
            return {
                ...state,
                bars: action.payload
            }
        }
        default:
            return initialState;
    }
}

export default sortReducer;