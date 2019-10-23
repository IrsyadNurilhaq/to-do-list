import ActionType from './GlobalActionType';

const globalStore = {
    'is_login' : false
}

const rootReducer = (state = globalStore, action) => {
    switch(action.type){
        case ActionType.SET_LOGIN:
            return {
                ...state,
                is_login : true
            }
        default: 
            return state
    }
}

export default rootReducer;