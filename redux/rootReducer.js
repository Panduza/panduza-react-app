import { combineReducers } from 'redux'

import brokersReducer from './brokers/reducer'
import activeBrokerReducer from './active_broker/reducer'

const rootReducer = combineReducers({
    // List of all registered brokers by the user
    "brokers": brokersReducer,
    // Data of the currently selected broker
    "activeBroker": activeBrokerReducer
})

export default rootReducer
