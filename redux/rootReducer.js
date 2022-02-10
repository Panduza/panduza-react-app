import { combineReducers } from 'redux'

import brokersReducer from './brokers/reducer'

const rootReducer = combineReducers({
    "brokers": brokersReducer
})

export default rootReducer
